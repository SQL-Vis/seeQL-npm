import React from 'react'
import {connect} from 'react-redux'
import {Tooltip} from '@material-ui/core'

export class CurrentSearch extends React.Component {
  constructor() {
    super()
    this.copyText = this.copyText.bind(this)
    this.state = {
      copied: 'copy text'
    }
  }

  componentDidUpdate(prevprops) {
    if (
      prevprops.searches.currentSearch !== this.props.searches.currentSearch
    ) {
      this.setState({
        copied: 'copy text'
      })
    }
  }

  copyText() {
    this.setState({
      copied: 'copied!'
    })
    let copyText = document.getElementById('copyTextBox').innerText
    let textArea = document.createElement('textarea')
    textArea.value = copyText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('Copy')
    textArea.remove()
  }

  render() {
    return (
      <div className="current-search-box">
        <div className="inner-current-search-box">
          <span className="bold-title">Current search: </span>
          <span id="copyTextBox" value={this.props.searches.currentSearch}>
            {this.props.searches.currentSearch}
          </span>
        </div>
        <div>
          <Tooltip
            title={<span className="tooltipText">{this.state.copied}</span>}
          >
            <button
              type="button"
              id="copy-button"
              className="btn waves-effect waves-light"
              onClick={this.copyText}
            >
              <i className="material-icons copy-button">content_copy</i>
            </button>
          </Tooltip>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  searches: state.searches
})

export default connect(mapStateToProps)(CurrentSearch)
