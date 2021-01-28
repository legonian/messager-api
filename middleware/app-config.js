const express = require('express')
const helmet = require('helmet')
const compression = require('compression')

module.exports = [
  compression(),
  helmet(),
  function (_req, res, next) {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '-1')
    next()
  },
  express.json({ limit: '5kb' }),
  express.urlencoded({ extended: false, limit: '5kb' })
]
