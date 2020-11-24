const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()

router.get('/', async (req, res, next) => {
  try {
    const ast = parser.astify(
      'SELECT length AND artist FROM songs WHERE artistId = 2'
    ) // mysql sql grammer parsed by default
    console.log(ast)
    res.send(ast)
  } catch (err) {
    next(err)
  }
})
