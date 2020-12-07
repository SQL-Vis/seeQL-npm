import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
  <nav className="navbar-material teal lighten-1">
    <div className="nav-wrapper">
      <Link to="/seeql/" className="brand-logo">
        <img alt="" src="./diagram.svg" width="30" height="30" /> seeQL
      </Link>
      <ul className="right hide-on-med-and-down">
        <li id="tutorial-link">
          <Link to="/seeql/walkthrough">Tutorial</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navbar
