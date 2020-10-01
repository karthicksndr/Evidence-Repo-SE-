import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //essential package for linking together components

//class defined specifically for having a navigation bar linked to appropriate components
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">SEER</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/login" className="nav-link">Login to SEER</Link>
          </li>
          <li className="navbar-item">
          <Link to="/search" className="nav-link">Search SEER</Link>
          </li>
          <li className="navbar-item">
          <Link to="/SubmitEvidence" className="nav-link">Submit Articles</Link>
          </li>

        </ul>
        </div>
      </nav>
    );
  }
}
