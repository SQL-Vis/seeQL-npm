const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const db = require('../db')

//api/query
router.post('/', async (req, res, next) => {
  try {
    // console.log("REQ.BODY", req.body.query)
    const ast = parser.astify(req.body.query) // mysql sql grammer parsed by default
    //converting object from parser to object to send to our vis
    // console.log('AST: ', ast)
    const visInfo = {}
    visInfo[ast.type] = []
    //looping through parsed columns to get table name and column name
    ast.columns.forEach(column => {
      const columnName = column.expr.column
      let tableName = column.expr.table
      //if there is no join, get the table name from the 'from' on the parsed object (because table name is null on column)
      if (!tableName) {
        tableName = ast.from[0].table
      }
      //convert tableName and columnName into one string to send back to front end to use as id for highlighting
      const idStr = tableName + columnName
      visInfo[ast.type].push(idStr)
    })
    res.send(visInfo)
  } catch (err) {
    next(err)
  }
})

//api/query/result
router.post('/result', async (req, res, next) => {
  try {
    console.log('REQ.BODY', req.body.query)
    const query = req.body.query
    const split = query.split(' ')
    const [results, metadata] = await db.query(query)
    console.log(results)
    res.send('hi')
  } catch (err) {
    next(err)
  }
})
