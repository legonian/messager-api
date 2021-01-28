const express = require('express')
const app = express()
const helmet = require('helmet')
const compression = require('compression')
const createError = require('http-errors')

const messagesRoute = require('./message-router')

// Trust 1 proxy hop for Heroku
app.set('trust proxy', 1)

// Config middlewares
app.use(compression())
app.use(helmet())
app.use(function (_req, res, next) {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '-1')
  next()
})
app.use(express.json({ limit: '5kb' }))
app.use(express.urlencoded({ extended: false, limit: '5kb' }))

// Routes
app.get('/', (_req, res) => res.send('Nothing There'))
app.use('/api/messages', messagesRoute)

// Errors
app.use(function (_req, _res, next) {
  next(createError(404))
}) 
app.use(function (err, req, res, _next) {
  res.status(err.status || 500)

  if (req.app.get('env') === 'development') {
    res.send(err)
  } else {
    res.send('Requested data do not exist.')
  }
})

module.exports = app
