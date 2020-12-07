import React from 'react'
import {connect} from 'react-redux'
import {fetchResult} from '../store/result'
import {DataGrid} from '@material-ui/data-grid'

export class Result extends React.Component {
  render() {
    const result = this.props.result || {}
    let columns
    let rows
    if (result.columns) {
      columns = result.columns.map(column => {
        return {
          field: column,
          headerName: column,
          headerClassName: 'result-header',
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
        {result.columns &&
          !this.props.error.error && (
            <DataGrid
              className="result-body"
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount="true"
            />
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  result: state.result,
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  getResult: queryStr => {
    dispatch(fetchResult(queryStr))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Result)
