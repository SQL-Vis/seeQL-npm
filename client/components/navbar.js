import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav className="navbar-material teal lighten-1">
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">
        <img alt="" src="/diagram.svg" width="30" height="30" /> SQL-VIS
      </a>
      <ul className="right hide-on-med-and-down">
        <li>
          <a href="">Instructions</a>
        </li>
      </ul>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  // return {
  //   isLoggedIn: !!state.user.id
  // }
}

const mapDispatch = dispatch => {
  return {
    // handleClick() {
    //   dispatch(logout())
    // }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
