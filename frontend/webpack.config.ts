import 'dotenv/config'
import { EnvironmentPlugin } from 'webpack'

module.exports = {
  plugins: [new EnvironmentPlugin(['APP_ID', 'SERVER_URL'])]
}
