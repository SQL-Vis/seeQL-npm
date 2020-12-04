import React from 'react'
import {connect} from 'react-redux'
import SearchVis from './SearchVis'
import QueryInput from './queryInput'
import Result from './result'
import Key from './key'
import CurrentSearch from './currentSearch'
import QueryHistory from './queryHistory'
import KeyMenu from './keyMenu'
import Footer from './footer'

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
          <div style={{width: '20%', marginTop: '30px'}}>
            {/* <KeyMenu /> */}
            <Key />
          </div>
        </div>
        <div className="sectionBox">
          <div className="sectionTitle">Database Schema & Visualization</div>
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

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
