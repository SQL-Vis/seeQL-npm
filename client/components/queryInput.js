import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'
import {fetchResult} from '../store/result'

export class QueryInput extends React.Component {
  constructor() {
    super()
    this.state = {
      query: '',
      lastSearch: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({query: e.target.value})
  }

  //@Natalie - does this need to be async?
  async handleSubmit(e) {
    e.preventDefault()
    await this.props.getQueryVis(this.state.query)
    await this.props.getResult(this.state.query)
    this.setState({...this.state, lastSearch: this.state.query})
    this.setState({...this.state, query: ''})
  }

  render() {
    // console.log("PROPS ", this.props)
    return (
      <div>
        <form className="submit-form" onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              value={this.state.query}
              type="text"
              onChange={this.handleChange}
              placeholder="Query"
            />
            {/* <label>Query</label> */}
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
        <div id="last-search">
          <span className="bold-title">Currently Displayed Search:</span>{' '}
          {this.state.lastSearch}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  queryVis: state.queryVis,
  result: state.result
})

const mapDispatchToProps = dispatch => ({
  getQueryVis: queryStr => {
    dispatch(fetchQueryVis(queryStr))
  },
  getResult: queryStr => {
    dispatch(fetchResult(queryStr))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryInput)
