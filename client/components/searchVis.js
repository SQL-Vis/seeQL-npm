import React from 'react'
import {connect} from 'react-redux'
import {fetchTables} from '../store/searchvis'

export class SearchVis extends React.Component {
  async componentDidMount() {
    this.props.getModels()
  }
  render() {
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
                    <tr key={column}>
                      <td>{column}</td>
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
  tables: state.tables
})

const mapDispatchToProps = dispatch => ({
  getModels: () => {
    dispatch(fetchTables())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchVis)
