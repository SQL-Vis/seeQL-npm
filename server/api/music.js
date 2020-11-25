const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const db = require('../db')

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

router.get('/models', async (req, res, next) => {
  try {
    const [results, metadata] = await db.query(
      "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema='public'"
    )
    // let tableNames = results.map(async (element) =>
    //   {
    //     let tableName = 'songs';
    //     console.log("ZEBRA", tableName)
    //     const [columnArray, columnMetadata] = await db.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'songs'")
    //     const mapped = columnArray.map((element2) => element2.column_name)
    //     console.log("HELLO", columnArray)
    //   });
    let prettierArray = results.reduce(
      (accum, element) => {
        for (let i = 0; i < accum.length; i++) {
          let current = accum[i]
          let tableName = element.table_name
          let columnName = element.column_name
          if (current[tableName]) {
            console.log('PANDA', current, tableName, columnName)
            //current[tableName].push(columnName)
          } else {
            let newObj = {}
            newObj[tableName] = columnName
            accum.push(newObj)
          }
        }
        return accum
      },
      ['test']
    )
    res.send(prettierArray)
  } catch (err) {
    next(err)
  }
})
