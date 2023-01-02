import request from 'supertest'
import {app} from '../../src'
import { HTTP_STATUSES } from '../../src'

describe('/videos', () => {
   
    beforeAll(async () => {
        await request(app).delete('/__test__/data')
    })

    it('should return 200 and array with two objects', async () => {
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [])
    })

    it('should return 404', async () => {
        await request(app)
            .get('/videos/999999')
            .expect(HTTP_STATUSES.NOT_FOUND)
    })

    it(`should'nt create video with incorrect input data`, async () => {
        await request(app)
            .post('/videos')
            .send({title: ''})
            .expect(HTTP_STATUSES.BAD_REQUEST_400)       
            
        await request(app)
            .get('/videos')
            .expect(HTTP_STATUSES.OK_200, [])
    })


    let createdVideo: any = null

    it(`should create video with correct input data`, async () => {
        const createResponse = await request(app)
            .post('/videos')
            .send({
                title: 'it-incubator',
                author: 'Vasia',
                availableResolutions: [
                    "P144"
                ]
            })
            .expect(HTTP_STATUSES.CREATED_201)

            createdVideo = createResponse.body

        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: 'it-incubator',
            author: 'Vasia',
            canBeDownloaded: true,
            minAgeRestriction: 15,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [
        "P144"
        ]
        })
        
    })

    it(`should'nt update video with correct input data`, async () => {
        const createResponse = await request(app)
            .put('/videos' + createdVideo.id)
            .send({
                title: 'it-incubator updated 1',
                author: 'Vasia Vasia 1',
                availableResolutions: [
                    "P144"
                ]
            })
            .expect(HTTP_STATUSES.NOT_FOUND)
        
    })

    it(`should update created video with correct input data`, async () => {
        const createResponse = await request(app)
        .post('/videos')
        .send({
                title: 'it-incubator updated',
                author: 'Vasia updated',
                availableResolutions: [
                    "P144"
                ]
            })
        .expect(HTTP_STATUSES.CREATED_201)

        createdVideo = createResponse.body
        console.log('CreaTEDvIDEO ', createdVideo)
        const putResponse = await request(app)
        .put(`/videos/${createdVideo.id}`)
        .expect(HTTP_STATUSES.NO_CONTENT_204)       
        
        expect(createdVideo).toEqual({
            id: expect.any(Number),
            title: 'it-incubator updated',
            author: 'Vasia updated',
            canBeDownloaded: true,
            minAgeRestriction: 15,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [
        "P144"
        ]})
            
        await request(app)
            .get('/videos/' + createdVideo.id)
            .expect(HTTP_STATUSES.OK_200, createdVideo)

    })

    it(`should delete created video with correct input data`, async () => {
        const createResponse = await request(app)
        .post('/videos')
        .send({
                title: 'it-incubator',
                author: 'Vasia',
                availableResolutions: [
                    "P144"
                ]
            })
        .expect(HTTP_STATUSES.CREATED_201)

        createdVideo = createResponse.body
       
        const getResponse = await request(app)
        .get(`/videos/${createdVideo.id}`)
        .expect(HTTP_STATUSES.OK_200)       
        
        expect(getResponse.body).toEqual(createdVideo)
            
        await request(app)
        .delete(`/videos/${createdVideo.id}`)
        .expect(HTTP_STATUSES.NO_CONTENT_204)

        await request(app)
        .get(`/videos/${createdVideo.id}`)
        .expect(HTTP_STATUSES.NOT_FOUND) 

    })


})