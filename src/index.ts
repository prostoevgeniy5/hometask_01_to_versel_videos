import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 3000

// const parserMiddleware = express.json()
// app.use(parserMiddleware)


const db = {
    courses:[
    {id: 1, title: 'front-end'},
    {id: 2, title: 'back-end'},
    {id: 3, title: 'react'}
  ],
  videos: [
    {
        "id": 0,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-12-13T09:52:47.923Z",
        "publicationDate": "2022-12-13T09:52:47.923Z",
        "availableResolutions": [
          "P144"
        ]
      },
      {
        "id": 1,
        "title": "string",
        "author": "string",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2022-12-13T09:52:47.923Z",
        "publicationDate": "2022-12-13T09:52:47.923Z",
        "availableResolutions": [
          "P144"
        ]
      }
  ]
}

app.get('/', (req: Request, res: Response) => {
  res.send({message:'Hello Samurai'})
})

app.get('/videos', (req: Request, res: Response) => {
  
  res.json(db.videos)
})

app.get('/videos/:id', (req: Request, res: Response) => {
  const video = db.videos.find(c => c.id === +req.params.id)

  if(!video) {
    res.sendStatus(404)

    return
  }
  res.json(video)
})


const startApp = async () => {
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()