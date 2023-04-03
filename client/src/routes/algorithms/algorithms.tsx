import React, { useEffect } from 'react';
import changeActiveLink from '../../utils/changeActiveLink';

function Algorithms() {
  useEffect(() => {
    changeActiveLink('/app/algorithms');
  });

  return (
    <div className="container d-flex flex-column flex-grow-1 align-items-center">
      <h1>Trading Algorithms</h1>
      <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
        Content goes here!
      </div>
    </div>
  );
}

export default Algorithms;
