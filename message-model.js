const mongoose = require('mongoose')

const db = mongoose.createConnection(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, function () {
  console.log('connected to db')
})

const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: /^([a-zA-Z0-9_.-]{1,80})@([\da-z.-]{1,50})\.([a-z.]{2,5})$/g,
    min: 6,
    max: 150
  },
  text: {
    type: String,
    required: true,
    match: /^([\s\S]{1,100})$/g,
    min: 1,
    max: 100
  },
  create_date: {
    type: Date,
    default: Date.now
  },
  edit_date: {
    type: Date
  }
})

module.exports = db.model('Message', messageSchema)

module.exports.paginating = async function (page, limit) {
  const model = this
  const startIndex = page * limit + 1

  const totalMessages = await model.countDocuments().exec()
  const totalPages = Math.ceil(totalMessages / limit)

  const results = {
    error: null,
    page,
    limit,
    total: totalPages
  }

  if (totalPages <= page) {
    results.error = 'Page Out of Range'
    return results
  }

  try {
    const res = await model
      .find()
      .sort({ create_date: 'asc' })
      .limit(limit)
      .skip(startIndex)
      .exec()

    results.messages = res
    return results
  } catch (e) {
    console.log('Error:', e)
    results.error = e.name
    return results
  }
}
