import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import './root.scss';

function Root() {
  return (
    <>
      <Header />
      <div id="main" className="container">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
