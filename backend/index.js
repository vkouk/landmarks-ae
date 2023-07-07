import express from 'express'
import dotenv from 'dotenv'

import { ParseServer } from 'parse-server'
import ParseDashboard from 'parse-dashboard'

dotenv.config()

// Use either PORT env for deployed versions or SERVER_PORT for local development
const PORT = process.env.PORT || process.env.SERVER_PORT

const app = express()

const parseServer = new ParseServer({
  databaseURI: process.env.DB_URI,
  cloud: `${process.cwd()}/cloud/main.js`,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
})
const parseDashboard = new ParseDashboard({
  apps: [
    {
      serverURL: '/parse',
      appId: process.env.APP_ID,
      masterKey: process.env.MASTER_KEY,
      appName: 'Landmarks Web App'
    }
  ]
})

await parseServer.start()

app.use('/parse', parseServer.app)
app.use('/dashboard', parseDashboard)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
