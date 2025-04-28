const config = require('./utils/config')
const path = require('path')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs')
const healthRouter = require('./controllers/health')
const { info, err } = require('./utils/logger')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((error) => {
    err('error connecting to MongoDB:', error)
  })

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/health', healthRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

app.use(middleware.unknownEndpoint)
module.exports = app
