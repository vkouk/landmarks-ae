interface ILandmark {
  id: string
  attributes: {
    title: string
    short_info: string
    description: string
    photo_thumb: string
    photo: string
    url: string
    location: number[]
  }
}

export { ILandmark }
