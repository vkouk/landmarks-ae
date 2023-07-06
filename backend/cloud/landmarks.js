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
    const LandMark = Parse.Object.extend('Landmark')
    const query = new Parse.Query(LandMark)

    query.select(
      'title',
      'photo_thumb',
      'short_info',
      'description',
      'location'
    )

    try {
      return await query.get(req.params.id)
    } catch (e) {
      throw new Parse.Error(404, `Landmark with id ${req.params.id} not found`)
    }
  },
  { fields: ['id'] }
)
