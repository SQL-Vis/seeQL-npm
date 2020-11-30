import React, {useRef} from 'react'
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
    console.log('ZEBRA', queryVis)
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
                      <td>{column}</td>
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
                color="Teal"
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
