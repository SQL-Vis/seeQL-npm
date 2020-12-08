import React from 'react'
import {connect} from 'react-redux'
import {
  SearchVis,
  QueryInput,
  Result,
  Key,
  CurrentSearch,
  QueryHistory,
  Footer,
  Loader
} from './index'

export class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    }

    return (
      <div>
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
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  result: state.result
})

export default connect(mapStateToProps)(Main)
