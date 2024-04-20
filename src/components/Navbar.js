import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  const handleSwitchClick = () => {
    // Call toggleMode function from props when the switch is clicked
    props.toggleMode();
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-${props.mode} navbar-${props.mode}`}
    >
      <div className="container-fluid">
        {/* Use the Link component instead of <a> for internal navigation */}
        <Link className="navbar-brand" to="/">
          {props.title}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Use the Link component for navigation links */}
            <li className="nav-item">
              <Link
                className={`nav-link${
                  props.mode === "dark" ? " text-light" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${
                  props.mode === "dark" ? " text-light" : ""
                }`}
                to="/about"
              >
                {props.aboutText}
              </Link>
            </li>
          </ul>

          {/* Optional search form */}
          {/* Uncomment the following block if you want to enable search */}
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}

          <div
            className={`form-check form-switch${
              props.mode === "dark" ? " text-light" : ""
            }`}
          >
            <input
              className="form-check-input"
              type="checkbox"
              onClick={handleSwitchClick}
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              {props.mode === "dark" ? "Enable Light Mode" : "Enable Dark Mode"}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};
