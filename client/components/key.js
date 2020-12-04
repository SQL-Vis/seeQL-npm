import React from 'react'

const Key = () => (
  <div>
    {/* <button
          onClick={this.showMenu}
          className="btn waves-effect waves-light"
        >
          Show Key
          <i className="material-icons right">vpn_key</i>
        </button> */}

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
  // <div className="card ">
  //   <div className="card-content ">
  //     Key:
  //     <table>
  //       <tbody>
  //         <tr>
  //           <td>
  //             {' '}
  //             <i className="material-icons">fingerprint</i>
  //           </td>
  //           <td>Primary Key</td>
  //           <td>
  //             <i className="material-icons">star</i>
  //           </td>
  //           <td>Foreign Key</td>
  //         </tr>
  //         <tr>
  //           <td>
  //             <i className="material-icons">arrow_downward</i>
  //           </td>
  //           <td>Order Descending</td>
  //           <td>
  //             <i className="material-icons">arrow_upward</i>
  //           </td>
  //           <td>Order Ascending</td>
  //         </tr>
  //         <tr>
  //           <td>
  //             <i className="material-icons teal-text text-lighten-2">
  //               call_missed_outgoing
  //             </i>
  //           </td>
  //           <td>Join</td>
  //           <td>
  //             <i className="material-icons teal-text text-lighten-5">
  //               brightness_1
  //             </i>
  //           </td>
  //           <td>Column Selected</td>
  //         </tr>
  //         <tr>
  //           <td>
  //             <i className="material-icons">feedback</i>
  //           </td>
  //           <td>Where Filter</td>
  //         </tr>
  //       </tbody>
  //     </table>
  //   </div>
  // </div>
)

export default Key
