import React from 'react'
import {connect} from 'react-redux'
import {
  SearchVis,
  QueryInput,
  Result,
  Key,
  QueryHistory,
  Footer,
  Loader
} from './index'
import {fetchTables} from '../store/searchvis'
import {fetchResult} from '../store/result'

export class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.collapsible')
      var instances = M.Collapsible.init(elems)
    })
    this.setState({
      loading: false
    })
  }

  handleClick() {
    let currentSearch
    if (!this.props.searches.currentSearch) {
      currentSearch = this.props.searches.lastSearches[
        this.props.searches.lastSearches.length - 1
      ]
    } else {
      currentSearch = this.props.searches.currentSearch
    }
    if (currentSearch) this.props.getResult(currentSearch)
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    }

    return (
      <div className="page-container">
        <div className="container">
          <div className="topDiv">
            <div className="topLeftDiv">
              <QueryInput />
              <QueryHistory />
            </div>
            <div className="topRightDiv">
              <Key />
            </div>
          </div>

          <div className="sectionBox">
            <ul className="collapsible">
              <li onClick={this.handleClick}>
                <div className="sectionTitle collapsible-header">
                  Query Result
                  <i className="material-icons">arrow_drop_down_circle</i>
                </div>
                {this.props.result.columns ? (
                  <div className="queryVisBox collapsible-body">
                    <Result />
                  </div>
                ) : (
                  <div className="collapsible-body" id="noResult">
                    Run a query to see results
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="sectionBox">
            <ul className="collapsible">
              <li className="active" onClick={this.props.getModels}>
                <div className="sectionTitle collapsible-header">
                  Database Schema & Search Visualization
                  <i className="material-icons">arrow_drop_down_circle</i>
                </div>
                <div className="queryVisBox collapsible-body">
                  <SearchVis />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  result: state.result,
  searches: state.searches
})

const mapDispatchToProps = dispatch => ({
  getModels: () => {
    dispatch(fetchTables())
  },
  getResult: queryStr => {
    dispatch(fetchResult(queryStr))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
