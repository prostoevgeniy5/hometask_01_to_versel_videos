import { db } from "./db"
import { Request, Response } from 'express'

export type Videos = {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: number
  createdAt: string
  publicationDate: string
  availableResolutions: string[]
}

export interface ErrorType {
    errorsMessages:  Array<{
        message: string
        field: string
      }>;
  }

export const videosRepository = {
    getVideos():Videos[] {
        return db.videos
    },
    getVideosById(id: number) {
        let videoItem = db.videos.find( (item: Videos) => {
            return item.id === id 
        })
        return videoItem
    },
    deleteVideosById(id: number) {
        let ind = null
        db.videos.forEach((item: Videos, index: number) => {
            if(item.id === index) {
                ind = index
            }
          })
          if (ind) {
            db.videos.splice(ind, 1)
            return true
          } else {
            return false
          }
    },
    updateVideosById(id: number, obj: object): Videos | undefined {
     let videoItem = db.videos.find( (item: Videos, ind: number) => {
        return item.id === id })    
        if (videoItem) {
            const resultVideoItem = Object.assign(videoItem, obj)            
            return resultVideoItem
        } else {
            return undefined
        }
    },
    createVideo(obj: Videos) {
        const newVideo: Videos = { 
            id: +(new Date()),
            title: obj.title,
            author: obj.author,
            canBeDownloaded: false,
            minAgeRestriction: 10,
            createdAt: "2022-12-13T09:52:47.923Z",
            publicationDate: "2022-12-13T09:52:47.923Z",
            availableResolutions: obj.availableResolutions
          }
        
          db.videos.push(newVideo)
          return newVideo
    },
    putOrDeleteData (req: Request, res: Response, methodName: string): Videos | ErrorType | undefined {
        const erMess: ErrorType = {errorsMessages: [] }
        switch(methodName as string) {
          case 'put' :
            if(! (typeof +req.params.id === 'number' && db.videos.find((el: Videos)   => {
                return el.id === +req.params.id })) ) {
                  erMess.errorsMessages.push(
                    {
                      "message": "Bad body data",
                      "field": "id"
                    }
                  )
                  // res.status(400).send(erMess)
                  return erMess
            } else {
              const resultVideoItem: Videos | undefined = videosRepository.updateVideosById(+req.params.id, req.body)
              if(resultVideoItem) {
                return resultVideoItem
              }
              return undefined
            }
          break;
          case 'delete' :
          if(! (typeof +req.params.id === 'number' && db.videos.find((el: Videos)   => {
            return el.id === +req.params.id })) ) {
              erMess.errorsMessages.push(
                {
                  "message": "Bad id data",
                  "field": "id"
                }
              )
              // res.status(400).send(erMess)
              return erMess
          } else {
            let resultVideoItem: Videos | undefined = db.videos.find((el: Videos)   => {
              return el.id === +req.params.id })
            return resultVideoItem
          }
        }
        
      }
       
}