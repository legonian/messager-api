const Message = require('./message-model')

module.exports.messagePage = async function (req, res) {
  const limit = 10
  const page = parseInt(req.params.page)

  if (Number.isNaN(page)) {
    res.redirect('/api/messages/list/0')
  } else {
    res.status(200)
    res.json(await Message.paginating(page, limit))
  }
}

module.exports.newMessage = async function (req, res) {
  const resJson = { error: null }

  try {
    const mess = new Message(req.body)
    resJson.message = await mess.save()
    res.status(201)
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.log('ValidationError. POST body:', req.body)
    } else {
      console.log(err)
    }
    resJson.error = err.name
    res.status(400)
  } finally {
    res.json(resJson)
  }
}

module.exports.oneMessage = async function (req, res) {
  const messageId = req.params.id

  try {
    const mess = await Message.findById(messageId).exec()
    mess.error = null
    res.status(200)
    res.json(mess)
  } catch (err) {
    res.status(404)
    res.json({ error: err.name })
  }
}
