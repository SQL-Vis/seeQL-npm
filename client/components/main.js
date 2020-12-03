import React from 'react'
import {connect} from 'react-redux'
import SearchVis from './SearchVis'
import QueryInput from './queryInput'
import Result from './result'
import Key from './key'
import CurrentSearch from './currentSearch'
import QueryHistory from './queryHistory'
import KeyMenu from './keyMenu'

export class Main extends React.Component {
  async componentDidMount() {}

  render() {
    return (
      <div className="container">
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{width: '70%'}}>
            <QueryInput />
            <QueryHistory />
            <CurrentSearch />
          </div>
          <div style={{width: '20%', marginTop: '30px'}}>
            <KeyMenu />
          </div>
        </div>
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
