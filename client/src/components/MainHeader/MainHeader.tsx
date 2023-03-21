import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './MainHeader.scss';

function MainHeader() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate({
      pathname: '/search',
      search: `?stock=${event.target[0].value}`,
    });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary" id="navbar-main">
      <div className="container-fluid">
        <Link to="" className="navbar-brand">
          <img
            src={logo}
            alt="logo"
            className="d-inline-block align-text-top me-1"
          />
          FireStock
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
          <ul className="navbar-nav mb-lg-0 me-4">
            <li className="nav-item">
              <Link to="" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          <form
            className="d-flex me-auto"
            role="search"
            onSubmit={handleSubmit}
          >
            <input
              className="form-control me-2"
              name="stock"
              type="search"
              placeholder="Search for stocks..."
              aria-label="Search"
            />
            <button className="btn btn-outline-danger" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="" className="nav-link" aria-current="page">
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link to="" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainHeader;
