import React from 'react'
import {connect} from 'react-redux'
import {fetchTables} from '../store/searchvis'
import Xarrow from 'react-xarrows'

export class SearchVis extends React.Component {
  // @Natalie Does the below actaully need to be async????
  async componentDidMount() {
    this.props.getModels()
  }
  render() {
    const queryVis = this.props.queryVis || {}
    // console.log('ZEBRA', queryVis)
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
                label={joinObject.type}
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
