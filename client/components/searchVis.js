import React from 'react'
import {connect} from 'react-redux'
import {fetchTables} from '../store/searchvis'

export class SearchVis extends React.Component {
  async componentDidMount() {
    this.props.getModels()
  }
  render() {
    const queryVis = this.props.queryVis || {}
    return (
      <div className="table-container">
        {this.props.tables.map(table => {
          const tableName = Object.keys(table)[0]
          return (
            <table className="vis-table" key={tableName}>
              <thead>
                <tr>
                  <th>{tableName}</th>
                </tr>
              </thead>
              <tbody>
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
                        )}{' '}
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
