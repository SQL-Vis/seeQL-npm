import React from 'react'
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
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{width: '67%'}}>
            <QueryInput />
            <QueryHistory />
            <CurrentSearch />
          </div>
          <div style={{width: '33%', marginTop: '30px'}}>
            <KeyMenu />
          </div>
        </div>
        <div className="queryVisBox">
          <SearchVis />
        </div>
        <div className="resultBox">
          <Result />
        </div>
        <Footer />
      </div>
    )
  }
}

export default Main
