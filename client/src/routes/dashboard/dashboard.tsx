import React, { useEffect } from 'react';
import changeActiveLink from '../../utils/changeActiveLink';

function Dashboard() {
  useEffect(() => {
    changeActiveLink('/app');
  });

  return (
    <div className="d-flex flex-column align-items-center center-content">
      <h1>Welcome to FireStock!</h1>
      <div className="d-flex flex-column mt-auto">
        <a
          className="btn btn-outline-danger mt-2"
          href="/app/stocks/AAPL"
          role="button"
        >
          View AAPL
        </a>
        <a
          className="btn btn-outline-danger mt-2"
          href="/app/stocks/MSFT"
          role="button"
        >
          View MSFT
        </a>
        <a
          className="btn btn-outline-danger mt-2"
          href="/app/search"
          role="button"
        >
          Search for Stocks
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
