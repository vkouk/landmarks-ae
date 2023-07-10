import sharp from 'sharp'

Parse.Cloud.define('fetchLandmarks', async (req) => {
  const LandMark = Parse.Object.extend('Landmark')
  const query = new Parse.Query(LandMark)

  query.ascending('order')
  query.select('title', 'photo_thumb', 'short_info')

  if (req.params.search) {
    query.fullText('title', req.params.search)
    query.ascending('$score')
  }

  try {
    return await query.find()
  } catch (e) {
    throw new Parse.Error(
      Parse.Error.INTERNAL_SERVER_ERROR,
      `Error retrieving objects: ${e.message}`
    )
  }
})

Parse.Cloud.define(
  'fetchLandmark',
  async (req) => {
    const title = req.params.title

    const LandMark = Parse.Object.extend('Landmark')
    const query = new Parse.Query(LandMark)

    query.equalTo('title', title)
    query.select(
      'title',
      'photo',
      'photo_thumb',
      'short_info',
      'description',
      'location',
      'url'
    )

    const res = await query.first()

    if (!res)
      throw new Parse.Error(404, `Landmark with title ${title} not found`)

    return res
  },
  {
    fields: ['title']
  }
)

Parse.Cloud.define(
  'updateLandmark',
  async (req) => {
    const { id, updatedData } = req.params

    const LandMark = Parse.Object.extend('Landmark')
    const query = new Parse.Query(LandMark)

    query.select('title', 'short_info', 'description')

    const model = await query.get(id)

    Object.keys(updatedData).forEach((key) => {
      const newValue = updatedData[key].trim()

      // Update only fields that have changed
      if (model.get(key) !== newValue) {
        model.set(key, newValue)
      }
    })

    await model.save(null, { sessionToken: req.user.getSessionToken() })

    return model
  },
  {
    fields: {
      id: {
        required: true,
        type: String
      },
      updatedData: {
        required: true,
        type: Object
      }
    },
    requireUser: true
  }
)

Parse.Cloud.define(
  'updatePhoto',
  async (req) => {
    const { id, image, name, type } = req.params

    const LandMark = Parse.Object.extend('Landmark')
    const query = new Parse.Query(LandMark)

    query.select('photo', 'photo_thumb')

    const model = await query.get(id)

    // Retrieve base64 data
    const base64Image = image.split(',')[1]
    const imageBuffer = Buffer.from(base64Image, 'base64')

    const photoThumbBuffer = await sharp(imageBuffer)
      .resize(Number(process.env.PHOTO_WIDTH), Number(process.env.PHOTO_HEIGHT))
      .toBuffer()

    // Save original photo
    const file = new Parse.File(name, { base64: base64Image }, type)
    await file.save({ sessionToken: req.user.getSessionToken() })

    // Save resized thumb photo
    const [fileName, fileExt] = name.split('.')
    const thumbFile = new Parse.File(
      `${fileName}_thumb.${fileExt}`,
      { base64: photoThumbBuffer.toString('base64') },
      type
    )
    await thumbFile.save({ sessionToken: req.user.getSessionToken() })

    model.set('photo', file.url())
    model.set('photo_thumb', thumbFile.url())

    await model.save(null, { sessionToken: req.user.getSessionToken() })

    return model
  },
  {
    fields: ['id', 'image', 'name', 'type'],
    requireUser: true
  }
)
