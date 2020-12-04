import React from 'react'

export default class WalkThrough extends React.Component {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.scrollspy')
      var instances = M.ScrollSpy.init(elems)
    })
  }
  render() {
    return (
      <div className="container">
        <h4>Tutorial</h4>
        <hr />
        <div className="row">
          <div className="col s12 m9 l10">
            <div id="submit" className="section scrollspy">
              <div>
                <h5>Submitting a query </h5>
                <p>
                  To submit a query, type a query into the form and click
                  submit.
                </p>
                <img />
              </div>
            </div>
            <div id="past" className="section scrollspy">
              <div>
                <h5>Selecting a past query </h5>
                <p>
                  To view a past query visualization, select an option from the
                  dropdown menu.
                </p>
                <img />
              </div>
            </div>
            <div id="results" className="section scrollspy">
              <div>
                <h5>Viewing results </h5>
                <p>
                  The key can be used for identifying denotations represented by
                  icons in the schema diagram.
                </p>
                <img src="/key.png" />
                <p>
                  The results of the current query can be viewed in the results
                  table.
                </p>
              </div>
            </div>
            <div id="supported" className="section scrollspy">
              <div>
                <h5>Supported grammer </h5>
                <p>Currently, only select statements are supported.</p>
                <img />
              </div>
            </div>
          </div>
          <div className="col hide-on-small-only m3 l2">
            <ul
              id="scroll-nav"
              style={{position: 'fixed'}}
              className="section table-of-contents"
            >
              <li>
                <a href="#submit">Submit query</a>
              </li>
              <li>
                <a href="#past">Select past queries</a>
              </li>
              <li>
                <a href="#results">View queried results</a>
              </li>
              <li>
                <a href="#supported">Supported grammer</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
