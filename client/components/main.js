import React from 'react'
import {connect} from 'react-redux'
import SearchVis from './SearchVis'
import QueryInput from './queryInput'
import Result from './result'

export class Main extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="container">
        <QueryInput />
        <div className="queryVisBox">
          <SearchVis />
        </div>
        <div className="resultBox">
          <Result />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
