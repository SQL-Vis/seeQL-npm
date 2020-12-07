const router = require('express').Router()

router.use('/api/models', require('./models')) // CHANGE TO ADD API
router.use('/api/query', require('./query'))

router.use('/api', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router // function (req, res, next) {}
