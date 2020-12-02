/* eslint-disable complexity */
const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const db = require('../db')
const {
  getOrderBy,
  getSelectedColumns,
  getJoin,
  formatTablesColumns
} = require('./parserHelper')

//api/query
router.post('/', async (req, res, next) => {
  try {
    console.log('REQ.BODY', req.body)
    const ast = parser.astify(req.body.query) // mysql sql grammer parsed by default
    //converting object from parser to object to send to our vis
    const visInfo = {
      select: [],
      all: [],
      join: [],
      orderby: {ASC: [], DESC: []}
    }

    const [results, metadata] = await db.query(
      "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema='public'"
    )

    let tableArray = formatTablesColumns(results)

    if (ast.type === 'select') {
      getSelectedColumns(ast, visInfo)
    }

    if (ast.orderby) {
      const status = getOrderBy(ast, visInfo, tableArray)
      if (status === 'duplicate') {
        throw new Error('column name too vague; specify table')
      }
      if (status === 'none') {
        throw new Error('column does not exist')
      }
    }

    if (ast.from) {
      getJoin(ast, visInfo)
    }

    res.send(visInfo)
  } catch (err) {
    next(err)
  }
})

//api/query/result
router.post('/result', async (req, res, next) => {
  try {
    const query = req.body.query
    const [results, metadata] = await db.query(query)
    const columns = Object.keys(results[0])
    const final = {columns: columns, rows: results}
    res.send(final)
  } catch (err) {
    next(err)
  }
})
