import React from 'react'
import {connect} from 'react-redux'
import SearchVis from './SearchVis'

export class Main extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div className="queryForm">
          <p>This will be the query form</p>
          <button>Submit Query</button>
        </div>
        <div className="queryVisBox">
          <SearchVis />
        </div>
        <div className="resultBox">
          <p>This is where the result will go</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
