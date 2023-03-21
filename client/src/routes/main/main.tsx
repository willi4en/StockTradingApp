import React, { useEffect } from 'react';
import { changeActiveLink } from '../../utils/helpers';

function Main() {
  useEffect(() => {
    changeActiveLink('/');
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="mb-4">Homepage</h1>
      <div>Quick Links (DEV ONLY)</div>
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
  );
}

export default Main;
