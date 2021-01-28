const express = require('express')
const router = express.Router()

const { oneMessage, messagePage, newMessage } = require('../controller/message')

router.get('/list', function (_req, res) {
  res.redirect('/api/messages/list/0')
})

router.get('/list/:page', messagePage)

router.post('/new', newMessage)

router.get('/single/:id', oneMessage)

module.exports = router
