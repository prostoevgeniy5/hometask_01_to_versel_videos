export const db = {
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
        "minAgeRestriction": 5,
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
        "minAgeRestriction": 15,
        "createdAt": "2022-12-13T09:52:47.923Z",
        "publicationDate": "2022-12-13T09:52:47.923Z",
        "availableResolutions": [
          "P144"
        ]
      }
  ]
}

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