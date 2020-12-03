import React from 'react'
import {Link} from 'react-router-dom'

const Key = () => (
  <div className="card ">
    <div className="card-content ">
      Key:
      <table>
        <tbody>
          <tr>
            <td>
              {' '}
              <i className="material-icons">fingerprint</i>
            </td>
            <td>Primary Key</td>
            <td>
              <i className="material-icons">star</i>
            </td>
            <td>Foreign Key</td>
          </tr>
          <tr>
            <td>
              <i className="material-icons">arrow_downward</i>
            </td>
            <td>Order Descending</td>
            <td>
              <i className="material-icons">arrow_upward</i>
            </td>
            <td>Order Ascending</td>
          </tr>
          <tr>
            <td>
              <i className="material-icons teal-text text-lighten-2">
                call_missed_outgoing
              </i>
            </td>
            <td>Join</td>
            <td>
              <i className="material-icons teal-text text-lighten-5">
                brightness_1
              </i>
            </td>
            <td>Column Selected</td>
          </tr>
          <tr>
            <td>
              <i className="material-icons">feedback</i>
            </td>
            <td>Where Filter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default Key
