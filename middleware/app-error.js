const createError = require('http-errors')

module.exports = [
  function (_req, _res, next) {
    next(createError(404))
  },
  function (err, req, res, _next) {
    // set locals, only providing error in development
    if (!res.locals.message) res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // error page
    res.status(err.status || 500)
    res.send(res.locals.error)
  }
]
