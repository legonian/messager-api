const express = require('express')
const router = express.Router()
const { oneMessage, messagePage, newMessage } = require('./message-controller')

router.get('/list', function (_req, res) {
  res.redirect('/api/messages/list/0')
})

router.get('/list/:page', messagePage)

router.get('/single/:id', oneMessage)

router.post('/new', newMessage)

module.exports = router
