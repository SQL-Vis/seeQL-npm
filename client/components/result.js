import React from 'react'
import {connect} from 'react-redux'
import {fetchResult} from '../store/result'

import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import {DataGrid} from '@material-ui/data-grid'

export class Result extends React.Component {
  render() {
    const result = this.props.result || {}
    console.log('RESULT', result)
    let columns
    let rows
    if (result.columns) {
      columns = result.columns.map(column => {
        return {
          field: column,
          headerName: column,
          width: 250,
          cellClassName: 'result-row'
        }
      })
      rows = result.rows.map((row, index) => {
        return {id: index, ...row}
      })
    }
    return (
      <div style={{height: 400, width: '100%'}}>
        {result.columns && (
          <DataGrid
            className="result-body"
            rows={rows}
            columns={columns}
            pageSize={5}
            hideFooterSelectedRowCount="true"
          />
        )}
      </div>

      // <TableContainer component={Paper}>
      //   <Table aria-label="simple table">
      //     <TableHead>
      //       <TableRow>
      //         {result.columns &&
      //           result.columns.map((column, index) => {
      //             return (
      //               <TableCell align="left" key={index}>
      //                 {column}
      //               </TableCell>
      //             )
      //           })}
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       {result.rows &&
      //         result.rows.map((row, index) => {
      //           return (
      //             <TableRow key={index}>
      //               {result.columns.map((column, index) => {
      //                 return <TableCell key={index}>{row[column]}</TableCell>
      //               })}
      //             </TableRow>
      //           )
      //         })}
      //     </TableBody>
      //   </Table>
      // </TableContainer>

      // <table className="result-body">
      //   <thead>
      //     <tr>
      //     {result.columns && result.columns.map((column, index) => {
      //         return <td key={index} className="table-title">{column}</td>
      //     })}
      //     </tr>
      //   </thead>
      //   <tbody>
      //     {result.rows && result.rows.map((row, index) => {
      //       return (
      //       <tr key={index}>
      //         {result.columns.map((column, index) => {
      //           return <td key={index}>{row[column]}</td>
      //         })}
      //       </tr>
      //     )})}
      //   </tbody>
      // </table>
    )
  }
}

const mapStateToProps = state => ({
  result: state.result
})

const mapDispatchToProps = dispatch => ({
  getResult: queryStr => {
    dispatch(fetchResult(queryStr))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
