import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'
import {getCurrentSearch} from '../store/searches'

export class QueryHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      options: [
        'SELECT title FROM songs',
        'SELECT songs.title, artists.age FROM songs RIGHT JOIN artists ON songs."artistId" = artists.id',
        'SELECT songs.title, songs.length, artists.name FROM songs LEFT JOIN artists ON songs."artistId" = artists.id ORDER BY artists.name DESC',
        'SELECT songs.title, albums.title, artists.name FROM songs LEFT JOIN artists ON songs."artistId" = artists.id LEFT JOIN albums on songs."albumId" = albums.id',
        'SELECT songs.title, artists.name, artists.age from songs RIGHT JOIN artists on songs."artistId" = artists.id WHERE artists.age > 28 AND artists.age < 35'
      ]
    }
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
        <select
          onChange={this.handleSelect}
          className="browser-default defaultHistory truncate"
        >
          <option value="" disabled selected>
            Revisit a past search or select a sample search...
          </option>
          <option value={this.state.options[0]}>{this.state.options[0]}</option>
          <option value={this.state.options[1]}>{this.state.options[1]}</option>
          <option value={this.state.options[2]}>{this.state.options[2]}</option>
          <option value={this.state.options[3]}>{this.state.options[3]}</option>
          <option value={this.state.options[4]}>{this.state.options[4]}</option>
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
