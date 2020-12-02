import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => (
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

export default Navbar
