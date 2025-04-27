const app = require('./server/app')
const config = require('./server/utils/config')
const { info } = require('./server/utils/logger')

const PORT = config.PORT || 5001

app.listen(PORT, () => {
  console.log(' index MONGODB_URI:', config.MONGODB_URI);
  info(`Server running on port ${PORT}`)
  info(`Running in environment: ${process.env.NODE_ENV}`);
})
