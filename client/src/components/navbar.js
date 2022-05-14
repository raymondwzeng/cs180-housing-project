import React from "react";
import "./navbar.css"

const Navbar = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse full-width" id="navbarNavDropdown">
        <ul className="navbar-nav flex-horizontal">
        <div className="logo-title">1990 Housing Data Viewer</div>
          <li className="nav-item">
            <a className="nav-link" href="/">
              View Data
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="graph">
              Analytics
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="factoids">
              Factoids
            </a>
          </li>
        </ul>
      </div>
    </nav>
    );
};

export default Navbar;