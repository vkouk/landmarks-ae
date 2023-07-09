interface ILandmark {
  id: string
  attributes: {
    title: string
    short_info?: string
    description?: string
    photo_thumb?: string
    photo?: string
    url?: string
    location?: number[]
  }
}

interface ILandmarkInput {
  title: string
  short_info: string
  description: string
}

export { ILandmark, ILandmarkInput }
