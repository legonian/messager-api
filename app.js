const express = require('express')
const app = express()

const config = require('./middleware/app-config')
const errorHandling = require('./middleware/app-error')

const rootRoute = require('./route/root')
const messagesRoute = require('./route/messages')

app.set('trust proxy', 1)
app.locals.ipList = {}

app.use(config)

app.use('/', rootRoute)
app.use('/api/messages', messagesRoute)

app.use(errorHandling)

module.exports = app
