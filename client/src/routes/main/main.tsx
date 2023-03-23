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
        <a
          className="btn btn-outline-danger mt-2"
          href="/stocks/AAPL"
          role="button"
        >
          View AAPL
        </a>
        <a
          className="btn btn-outline-danger mt-2"
          href="/stocks/MSFT"
          role="button"
        >
          View MSFT
        </a>
        <a className="btn btn-outline-danger mt-2" href="/search" role="button">
          Search for Stocks
        </a>
      </div>
    </div>
  );
}

export default Main;
