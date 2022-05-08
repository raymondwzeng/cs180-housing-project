import React from "react";
//import Navbar from 'react-bootstrap/Navbar'

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-blue">
      <a className="navbar-brand" href="/">
        Home
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="graph">
              View Data
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="analytics">
              Analytics
            </a>
          </li>
          <li>
           
          </li>
        </ul>
      </div>
    </nav>
    );
};

export default Navbar;