import React, { useEffect } from 'react';
import changeActiveLink from '../../utils/changeActiveLink';
import './main.scss';

function Main() {
  useEffect(() => {
    changeActiveLink('/');
  });

  return (
    <div className="d-flex flex-column align-items-center center-content">
      <h1>Welcome to FireStock!</h1>
      <div className="d-flex flex-column mt-auto">
        <a className="btn btn-outline-danger mt-2" href="/login" role="button">
          Login to FireStock
        </a>
        <a className="btn btn-outline-danger mt-2" href="/about" role="button">
          Project Information
        </a>
      </div>
    </div>
  );
}

export default Main;
