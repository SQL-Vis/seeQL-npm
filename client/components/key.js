import React from 'react'

const Key = () => (
  <div>
    <ul className="collection key">
      <li className="menuItemHeader">
        <strong>Key</strong> <i className="material-icons right">vpn_key</i>
      </li>
      <li className="menuItem">
        <i className="material-icons menuIcon">fingerprint</i> Primary Key
      </li>
      <li className="menuItem">
        <i className="material-icons menuIcon">star</i> Foreign Key
      </li>
      <li className="menuItem">
        <i className="material-icons menuIcon">arrow_upward</i> Order Ascending
      </li>
      <li className="menuItem">
        <i className="material-icons menuIcon">arrow_downward</i> Order
        Descending
      </li>
      <li className="menuItem">
        <i className="material-icons teal-text text-lighten-2 menuIcon">
          call_missed_outgoing
        </i>{' '}
        Join
      </li>
      <li className="menuItem">
        <i className="material-icons teal-text text-lighten-5 menuIcon">
          brightness_1
        </i>{' '}
        Column Selected
      </li>
      <li className="menuItem">
        <i className="material-icons menuIcon">feedback</i> Where Filter
      </li>
    </ul>
  </div>
)

export default Key
