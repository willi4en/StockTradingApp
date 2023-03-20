import React, { useEffect } from 'react';
import { changeActiveLink } from '../../utils/changeActiveLink';

function Main() {
  useEffect(() => {
    changeActiveLink('/');
  });

  return (
    <>
      <div className="mb-4">Homepage</div>
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
    </>
  );
}

export default Main;
