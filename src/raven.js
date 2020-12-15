import Raven from 'raven-js'
import config from '../package.json'

const ravenToken = ''

Raven.config(
  ravenToken,
  {
    environment: process.env.SERVER_ENV,
    shouldSendCallback: () => process.env.NODE_ENV === 'production',
    release: config.version
  }
).install()

export default Raven
