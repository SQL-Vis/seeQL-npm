import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'
import {getCurrentSearch} from '../store/searches'

export class QueryHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      options: []
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.generateDefaultQuery = this.generateDefaultQuery.bind(this)
  }

  componentDidUpdate(prevprops) {
    if (prevprops.tables !== this.props.tables) {
      this.setState({
        options: [...this.state.options, this.generateDefaultQuery()]
      })
    }
  }

  generateDefaultQuery() {
    let column = ''
    let table = ''
    if (this.props.tables.length) {
      column = this.props.tables[0][Object.keys(this.props.tables[0])[0]][0]
      table = Object.keys(this.props.tables[0])[0]
    }
    if (column.toLowerCase() !== column) {
      column = `"${column}"`
    }
    let query = `SELECT ${column} FROM ${table}`
    return query
  }

  handleSelect(e) {
    this.props.setCurrentSearch(e.target.value)
    this.props.getQueryVis(e.target.value)
    this.props.getResult(e.target.value)
  }
  render() {
    return (
      <div className="select-box">
        <select
          onChange={this.handleSelect}
          className="browser-default defaultHistory truncate"
        >
          <option value="" disabled selected>
            Revisit a past search or select a sample search...
          </option>
          {this.state.options.map((option, idx) => {
            return (
              <option key={idx} value={option}>
                {option}
              </option>
            )
          })}
          {this.props.searches.lastSearches &&
            this.props.searches.lastSearches.map((search, idx) => {
              return (
                <option key={idx} value={search}>
                  {search}
                </option>
              )
            })}
        </select>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searches: state.searches,
  tables: state.tables
})

const mapDispatchToProps = dispatch => ({
  getQueryVis: queryStr => {
    dispatch(fetchQueryVis(queryStr))
  },
  getResult: queryStr => {
    dispatch(fetchResult(queryStr))
  },
  setCurrentSearch: currentSearch => {
    dispatch(getCurrentSearch(currentSearch))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryHistory)
