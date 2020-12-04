import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'
import {getCurrentSearch} from '../store/searches'

export class QueryHistory extends React.Component {
  constructor() {
    super()

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(e) {
    this.props.setCurrentSearch(e.target.value)
    this.props.getQueryVis(e.target.value)
    this.props.getResult(e.target.value)
  }
  render() {
    return (
      <div className="query-box">
        <select onChange={this.handleSelect} className="browser-default">
          <option value="" disabled selected>
            Revisit a past search...
          </option>
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
  searches: state.searches
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
