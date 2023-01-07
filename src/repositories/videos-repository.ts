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

export type ErrorType = {
  
  "message": string
  "field": string
}

export type ErrorsType = {
  // "errorsMessages": ErrorType[]
  [key: string]:ErrorType[]
}

// export interface ErrorType {
//     errorsMessages:  Array<{
//         message: string
//         field: string
//       }>;
//   }

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
            minAgeRestriction: 1,
            createdAt: "2022-12-13T09:52:47.923Z",
            publicationDate: "2022-12-13T09:52:47.923Z",
            availableResolutions: obj.availableResolutions
          }
        
          db.videos.push(newVideo)
          return newVideo
    },
    putOrDeleteData (req: Request, res: Response, methodName: string): Videos | ErrorsType | undefined {
        const erMess: ErrorsType = {"errorsMessages": [] }
        switch(methodName as string) {
          case 'put' :
            if(! (typeof +req.params.id === 'number' && db.videos.find((el: Videos)   => {
                return el.id === +req.params.id })) ) {
                  return
            } if (!req.body.title || typeof req.body.title === null || req.body.title.length > 40) {
                  erMess.errorsMessages.push(
                    {
                      "message": "Bad body data",
                      "field": "title"
                    }
                  )
                  
            } if (!req.body.author || typeof req.body.author === null || req.body.author.length > 20) {
              erMess.errorsMessages.push(
                {
                  "message": "Bad body data",
                  "field": "author"
                }
              )
            } if (req.body.publicationDate && (typeof req.body.publicationDate !== "string")) {
              erMess.errorsMessages.push(
                {
                  "message": "Bad body data",
                  "field": "publicationDate"
                }
              )
              
            } if (req.body.canBeDownloaded && (typeof req.body.canBeDownloaded !== "boolean")) {
                  erMess.errorsMessages.push(
                    {
                      "message": "Bad body data",
                      "field": "canBeDownloaded"
                    }
                  )
                  
            } if (req.body.minAgeRestriction && (typeof req.body.minAgeRestriction !== "number" || req.body.minAgeRestriction < 1 || req.body.minAgeRestriction > 18)) {
              erMess.errorsMessages.push(
                {
                  "message": "Bad body data",
                  "field": "minAgeRestriction"
                }
              )
            } if(erMess.errorsMessages.length > 0) {
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
          const findResult = db.videos.find((el: Videos)   => {
            return el.id === +req.params.id })

          if(typeof findResult === 'undefined') {
              return
          } else {
            let resultVideoItem: Videos | undefined = db.videos.find((el: Videos)   => {
              return el.id === +req.params.id })
            return resultVideoItem
          }
        }
        
      }
       
}