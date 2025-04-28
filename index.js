const app = require('./server/app')
const config = require('./server/utils/config')
const { info } = require('./server/utils/logger')

const PORT = config.PORT || 5001

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
