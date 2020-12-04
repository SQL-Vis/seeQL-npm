import React from 'react'
import SearchVis from './SearchVis'
import QueryInput from './queryInput'
import Result from './result'
import Key from './key'
import CurrentSearch from './currentSearch'
import QueryHistory from './queryHistory'
import KeyMenu from './keyMenu'
import Footer from './footer'
import {connect} from 'react-redux'

export class Main extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="topDiv">
          <div className="topLeftDiv">
            <QueryInput />
            <QueryHistory />
            <CurrentSearch />
          </div>
          <div className="topRightDiv">
            <Key />
          </div>
        </div>
        <div className="sectionBox">
          <div className="sectionTitle">
            Database Schema & Search Visualization
          </div>
          <div className="queryVisBox">
            <SearchVis />
          </div>
        </div>
        {this.props.result.columns && (
          <div className="sectionBox">
            <div className="sectionTitle">Query Result</div>
            <div className="resultBox">
              <Result />
            </div>
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  result: state.result
})

export default connect(mapStateToProps)(Main)
