Parse.Cloud.define('hello', async (req) => {
  console.log({ req: req.user, params: req.params })
  return 'Hi'
})
