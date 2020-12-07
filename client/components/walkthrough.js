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
        <h4 id="tutorialHeader">Tutorial</h4>
        <hr />
        <div className="row">
          <div className="col s12 m9 l10">
            <div id="submit" className="section scrollspy">
              <div>
                <h5>Submitting a query </h5>
                <p>
                  To submit a query, type a query into the form and click submit
                  or press enter on your keyboard.
                </p>
                <img
                  className="gif"
                  src="https://media.giphy.com/media/iGAMgsoJ59IAzHxYew/giphy.gif"
                />
              </div>
            </div>
            <div id="past" className="section scrollspy">
              <div>
                <h5>Selecting a past query </h5>
                <p>
                  To view a past query visualization, select an option from the
                  dropdown menu. You do not need to click submit for this query
                  to run.
                </p>
                <img
                  className="gif"
                  src="https://media.giphy.com/media/GsIiMqsJ4Mie49WIcD/giphy.gif"
                />
              </div>
            </div>
            <div id="results" className="section scrollspy">
              <div>
                <h5>Viewing results and visualization </h5>
                <p>
                  The key can be used for identifying denotations represented by
                  icons and arrows in the schema diagram.
                </p>
                <img id="keyImg" src="./key.png" />
                <ul>
                  <li>
                    Primary Key indicates a model's primary identifying key.
                    This will typically be "id"
                  </li>
                  <li>
                    Foreign Key indicates a foreign key that associates a model
                    to another model.
                  </li>
                  <li>
                    Order Ascending indicates that the results are ordered by
                    this column in ascending order (lowest to highest, A-Z)
                  </li>
                  <li>
                    Order Descending indicates that the results are ordered by
                    this column in descending order (highest to lowest, Z-A)
                  </li>
                  <li>
                    Join indicates that two models are being joined via primary
                    and foreign keys. The arrow points from the primary key
                    column to the foreign key column.{' '}
                  </li>
                  <li>
                    Column Selected indicates which columns in each model are
                    being targeted from the query and will appear in the results
                    table. Columns will be highlited if they are selected.
                  </li>
                  <li>
                    Where Filter indicates that the query results are
                    constrained by a where clause on the marked column.
                  </li>
                </ul>
                <p>
                  The results of the current query can be viewed in the results
                  table at the bottom of the page. In the results table, click
                  on a column header to toggle results order between ascending,
                  descending, and the original result version.
                </p>
                <img
                  className="gif"
                  src="https://media.giphy.com/media/RlwpTL9Rh6MhxcEZug/giphy.gif"
                />
              </div>
            </div>
            <div id="supported" className="section scrollspy">
              <div>
                <h5>Supported grammar </h5>
                <p>Currently, only select statements are supported.</p>
                <p>
                  When writing a select statement, you may use either capital or
                  lowercase letters for your SQL keywords.
                </p>
                <p>
                  Specific model and column names, however, are case sensitive
                  and must match those in your database. If your column or
                  database name contains a capital letter, you must place that
                  column name in double quotes (") i.e. songs."artistId".
                </p>
                <p>
                  When using the ORDER BY keyword, you must indicate both the
                  model and column name that you wish to order by i.e. ORDER BY
                  artists.age ASC.
                </p>
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
                <a href="#supported">Supported grammar</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
