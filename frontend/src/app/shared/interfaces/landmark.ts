interface ILandmark {
  id: string
  attributes: {
    title: string
    short_info: string
    description: string
    photo_thumb: string
    url: string
    location: number[]
  }
}

export { ILandmark }
