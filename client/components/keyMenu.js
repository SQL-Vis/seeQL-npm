import React from 'react'

export default class KeyMenu extends React.Component {
  constructor() {
    super()

    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu(event) {
    event.preventDefault()

    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({showMenu: false}, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={this.showMenu}
          className="btn waves-effect waves-light"
        >
          Show Key
          <i className="material-icons right">vpn_key</i>
        </button>
        {this.state.showMenu ? (
          <ul
            className="menu collection"
            ref={element => {
              this.dropdownMenu = element
            }}
          >
            <li className="menuItem">
              <i className="material-icons">fingerprint</i> Primary Key{' '}
            </li>
            <li className="menuItem">
              <i className="material-icons">star</i> Foreign Key
            </li>
            <li className="menuItem">
              <i className="material-icons">arrow_upward</i> Order Ascending
            </li>
            <li className="menuItem">
              <i className="material-icons">arrow_downward</i> Order Descending
            </li>
            <li className="menuItem">
              <i className="material-icons teal-text text-lighten-2">
                call_missed_outgoing
              </i>{' '}
              Join
            </li>
            <li className="menuItem">
              <i className="material-icons teal-text text-lighten-5">
                brightness_1
              </i>{' '}
              Column Selected
            </li>
            <li>
              <i className="material-icons">feedback</i> Where Filter
            </li>
          </ul>
        ) : null}
      </div>
    )
  }
}
