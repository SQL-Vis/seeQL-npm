/* eslint-disable react/no-array-index-key */
/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {fetchTables} from '../store/searchvis'
import Xarrow from 'react-xarrows'
import {Tooltip} from '@material-ui/core'
import {Loader} from './index.js'

export class SearchVis extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.getModels()
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.tooltipped')
      var instances = M.Tooltip.init(elems, options)
    })
    this.setState({
      loading: false
    })
  }
  render() {
    if (this.state.loading) {
      return <Loader />
    }

    const queryVis = this.props.queryVis || {}
    return (
      <div className="table-container">
        {this.props.tables.map(table => {
          const tableName = Object.keys(table)[0]
          return (
            <table className="vis-table" key={tableName}>
              <thead>
                <tr>
                  <th className="table-title">{tableName}</th>
                </tr>
              </thead>
              <tbody
                className={
                  queryVis.all && queryVis.all.includes(tableName)
                    ? 'highlighted'
                    : 'notHighlighted'
                }
              >
                {table[tableName].map(column => {
                  return (
                    <tr
                      key={column}
                      id={tableName + column}
                      className={
                        queryVis.select &&
                        queryVis.select.includes(tableName + column)
                          ? 'highlighted'
                          : 'notHighlighted'
                      }
                    >
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        {column}
                        {column.includes('id') && (
                          <i className="material-icons">fingerprint</i>
                        )}
                        {column.includes('Id') && (
                          <i className="material-icons">star</i>
                        )}
                        {queryVis.orderby &&
                          queryVis.orderby.ASC.includes(tableName + column) && (
                            <i className="material-icons">arrow_upward</i>
                          )}
                        {queryVis.orderby &&
                          queryVis.orderby.DESC.includes(
                            tableName + column
                          ) && <i className="material-icons">arrow_downward</i>}
                        {queryVis.where &&
                          queryVis.where
                            .map(element => element.idStr)
                            .includes(tableName + column) && (
                            <Tooltip
                              title={
                                <span className="tooltipText">
                                  {queryVis.where
                                    .filter(e => e.idStr === tableName + column)
                                    .map(e => e.operator + ' ' + e.value)
                                    .join(', ')}
                                </span>
                              }
                            >
                              <i className="material-icons">feedback</i>
                            </Tooltip>
                          )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        })}
        {queryVis.join &&
          queryVis.join.length > 0 &&
          queryVis.join.map((joinObject, index) => {
            return (
              <Xarrow
                key={index}
                start={joinObject.left}
                end={joinObject.right}
                label={joinObject.type
                  .split(' ')
                  .map(e => e[0])
                  .join('')
                  .toUpperCase()}
                color="#26a69a"
                dashness={{strokeLen: 10, nonStrokeLen: 10, animation: 1.5}}
              />
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tables: state.tables,
  queryVis: state.queryVis
})

const mapDispatchToProps = dispatch => ({
  getModels: () => {
    dispatch(fetchTables())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchVis)
