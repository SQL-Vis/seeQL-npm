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

export class Result extends React.Component {
  async componentDidMount() {
    // this.props.getResult()
  }
  render() {
    const result = this.props.result || {}
    console.log('RESULT', result)
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {result.columns &&
                result.columns.map((column, index) => {
                  return (
                    <TableCell align="left" key={index}>
                      {column}
                    </TableCell>
                  )
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {result.rows &&
              result.rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {result.columns.map((column, index) => {
                      return <TableCell key={index}>{row[column]}</TableCell>
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>

      // <table>
      //   <thead>
      //     <tr>
      //     {result.columns && result.columns.map((column, index) => {
      //         return <td key={index}>{column}</td>
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
