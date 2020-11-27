const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const db = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const ast = parser.astify(
      'select songs.title, artists.age from songs left join artists on song.artistId = artists.id'
    ) // mysql sql grammer parsed by default
    console.log(ast)
    res.send(ast)
  } catch (err) {
    next(err)
  }
})

router.get('/models', async (req, res, next) => {
  try {
    const [results, metadata] = await db.query(
      "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema='public'"
    )
    let prettierArray = results.reduce(
      (accum, element) => {
        for (let i = 0; i < accum.length; i++) {
          let current = accum[i]
          let tableName = element.table_name
          let columnName = element.column_name
          if (current[tableName]) {
            current[tableName].push(columnName)
            break
          } else if (i === accum.length - 1) {
            let newObj = {}
            newObj[tableName] = []
            accum.push(newObj)
          }
        }
        return accum
      },
      ['test']
    )
    res.send(prettierArray.slice(1))
  } catch (err) {
    next(err)
  }
})
