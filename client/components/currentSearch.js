import React from 'react'
import {connect} from 'react-redux'

export class CurrentSearch extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="card ">
          <div className="card-content ">
            Current search: {this.props.searches.currentSearch}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searches: state.searches
})

export default connect(mapStateToProps)(CurrentSearch)
