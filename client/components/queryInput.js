import React from 'react'
import {connect} from 'react-redux'
import {fetchQueryVis} from '../store/query'

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
    this.setState({...this.state, lastSearch: this.state.query})
    this.setState({...this.state, query: ''})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
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
        <div>{this.state.lastSearch}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  queryVis: state.queryVis
})

const mapDispatchToProps = dispatch => ({
  getQueryVis: queryStr => {
    dispatch(fetchQueryVis(queryStr))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryInput)
