import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'
import {getCurrentSearch, getLastSearches} from '../store/searches'

export class QueryInput extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      copied: 'copy'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.copyText = this.copyText.bind(this)
  }

  componentDidUpdate(prevprops) {
    if (
      prevprops.searches.currentSearch !== this.props.searches.currentSearch
    ) {
      this.setState({
        copied: 'copy',
        query: this.props.searches.currentSearch
      })
    }
  }

  copyText() {
    this.setState({...this.state, copied: 'copied!'})
    let copyText = document.getElementById('copyText')
    copyText.select()
    document.execCommand('Copy')
  }

  handleChange(e) {
    this.setState({copied: 'copy', query: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.getQueryVis(this.state.query)
    this.props.getResult(this.state.query)
    this.props.setCurrentSearch(this.state.query)
    this.props.setLastSearches(this.state.query)
  }

  render() {
    return (
      <div className="query-box">
        <form onSubmit={this.handleSubmit}>
          <div id="inner-query-box">
            <div id="submit-row">
              <input
                value={this.state.query}
                type="text"
                onChange={this.handleChange}
                placeholder="Input SQL query here"
                id="copyText"
              />
            </div>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
            <button
              className="btn waves-effect waves-light"
              type="button"
              name="action"
              onClick={() => this.setState({copied: 'copy', query: ''})}
            >
              Clear
              <i className="material-icons right">clear</i>
            </button>
            <button
              className="btn waves-effect waves-light"
              type="button"
              name="action"
              onClick={this.copyText}
            >
              {this.state.copied}
              <i className="material-icons right">content_copy</i>
            </button>
            {(this.props.error.parser.error ||
              this.props.error.database.error) && (
              <div className="errorMessage">
                {this.props.error.parser.error ||
                  this.props.error.database.error}
                <i className="material-icons errorIcon">error_outline</i>
              </div>
            )}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  queryVis: state.queryVis,
  result: state.result,
  error: state.error,
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
  },
  setLastSearches: lastSearch => {
    dispatch(getLastSearches(lastSearch))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryInput)
