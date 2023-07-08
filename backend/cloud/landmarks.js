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
