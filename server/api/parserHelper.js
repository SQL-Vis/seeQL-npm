var _ = require('lodash')

function getSelectedColumns(ast, visInfo) {
  if (ast.columns === '*') {
    ast.from.forEach(el => {
      visInfo.all.push(el.table)
    })
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
      visInfo.select.push(idStr)
    })
  }
}

function getOrderBy(ast, visInfo, tableArray) {
  for (let i = 0; i < ast.orderby.length; i++) {
    const elem = ast.orderby[i]
    if (elem.expr.table) {
      visInfo.orderby[elem.type].push(elem.expr.table + elem.expr.column)
    } else {
      let tableMatch = uniqueColumnConfirmation(elem.expr.column, tableArray)
      if (tableMatch !== 'duplicate' && tableMatch !== 'none') {
        visInfo.orderby[elem.type].push(tableMatch + elem.expr.column)
      } else {
        return tableMatch
      }
    }
  }
  return 'success'
}

function getJoin(ast, visInfo) {
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

function getWhere(whereObj, visInfo, tableArray) {
  if (whereObj.operator !== 'AND') {
    let whereVis = {
      operator: whereObj.operator,
      value: whereObj.right.value
    }
    if (whereObj.left.table) {
      whereVis.idStr = whereObj.left.table + whereObj.left.column
      visInfo.where.push(whereVis)
    } else {
      let tableMatch = uniqueColumnConfirmation(
        whereObj.left.column,
        tableArray
      )
      if (tableMatch !== 'duplicate' && tableMatch !== 'none') {
        whereVis.idStr = tableMatch + whereObj.left.column
        visInfo.where.push(whereVis)
      } else {
        return tableMatch
      }
    }
  } else {
    console.log('HELLO', whereObj.left)
    getWhere(whereObj.left, visInfo, tableArray)
    getWhere(whereObj.right, visInfo, tableArray)
  }
}

function uniqueColumnConfirmation(columnName, tableArray) {
  let counter = 0
  let tableMatch = ''
  for (let i = 0; i < tableArray.length; i++) {
    const table = tableArray[i]
    const tableName = Object.keys(table)[0]
    if (table[tableName].includes(columnName)) {
      counter++
      tableMatch = tableName
    }
  }
  if (counter > 1) {
    // throw new Error('Duplicate Column Name');
    return 'duplicate'
  }
  if (counter === 0) {
    return 'none'
  }
  if (counter === 1) {
    return tableMatch
  }
}

function formatTablesColumns(resultsObj) {
  let prettierArray = _.reduce(
    resultsObj,
    function(result, value) {
      let tableName = value.table_name
      let columnName = value.column_name
      let exists = _.find(result, function(o) {
        return o[tableName]
      })
      if (exists) {
        exists[tableName].push(columnName)
      } else {
        let obj = {}
        obj[tableName] = [columnName]
        result.push(obj)
      }
      return result
    },
    []
  )
  return prettierArray
}

module.exports = {
  getOrderBy,
  getSelectedColumns,
  getJoin,
  getWhere,
  formatTablesColumns
}
