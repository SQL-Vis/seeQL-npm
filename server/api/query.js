const router = require('express').Router()
module.exports = router
const {Parser} = require('node-sql-parser')
const parser = new Parser()
const db = require('../db')

//api/query
router.post('/', async (req, res, next) => {
  try {
    console.log('REQ.BODY', req.body)
    const ast = parser.astify(req.body.query) // mysql sql grammer parsed by default
    //converting object from parser to object to send to our vis
    const visInfo = {all: [], join: [], orderby: {ASC: [], DESC: []}}
    visInfo[ast.type] = []
    if (ast.columns === '*') {
      ast.from.forEach(el => {
        visInfo.all.push(el.table)
      })
    }
    //orderBy: [{dir: 'asc', id: 'songstitle'}]
    if (ast.orderby) {
      // let res= ast.orderBy.map((elem)=>( {
      //   id: elem.expr.column,
      //   dir: elem.type
      // }))
      for (let i = 0; i < ast.orderby.length; i++) {
        const elem = ast.orderby[i]
        if (elem.expr.table) {
          visInfo.orderby[elem.type].push(elem.expr.table + elem.expr.column)
          // visInfo.orderby.push({
          //   dir: elem.type,
          //   id: elem.expr.table + elem.expr.column,
          // })
        }
      }
    }
    //looping through parsed columns to get table name and column name
    if (Array.isArray(ast.columns)) {
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
    }

    /// Adding JOINs to visInfo Array
    visInfo.join = []
    if (ast.from) {
      let fromArray = ast.from
      for (let i = 0; i < fromArray.length; i++) {
        if (fromArray[i].join) {
          let joinSource = fromArray[i]
          let joinObject = {
            type: joinSource.join,
            left: joinSource.on.left.table + joinSource.on.left.column,
            right: joinSource.on.right.table + joinSource.on.right.column
          }
          visInfo.join.push(joinObject)
        }
      }
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
