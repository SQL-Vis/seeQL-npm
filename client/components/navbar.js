import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
    <div className="nav-wrapper">
      <img
        alt=""
        href="#"
        src="/diagram.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
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

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
