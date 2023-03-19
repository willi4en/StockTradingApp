import React from 'react';
import { Outlet } from 'react-router-dom';
import './root.scss';

function Root() {
  return (
    // add header here
    <div id="main" className="container">
      <div>This app works!</div>
      <Outlet />
    </div>
    // add footer here
  );
}

export default Root;
