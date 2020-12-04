import React from 'react'
import {connect} from 'react-redux'

export class CurrentSearch extends React.Component {
  render() {
    return (
      <div className="query-box">
        <div className="inner-query-box">
          <span className="bold-title">Current search: </span>
          {this.props.searches.currentSearch}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searches: state.searches
})

export default connect(mapStateToProps)(CurrentSearch)
