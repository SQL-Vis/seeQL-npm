import React from 'react'
import {Link} from 'react-router-dom'
import KeyMenu from './keyMenu'

const Navbar = () => (
  <nav className="navbar-material teal lighten-1">
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">
        <img alt="" src="./diagram.svg" width="30" height="30" /> seeQL
      </Link>
      <ul className="right hide-on-med-and-down">
        <li id="tutorial-link">
          <Link to="/walkthrough">Tutorial</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar
