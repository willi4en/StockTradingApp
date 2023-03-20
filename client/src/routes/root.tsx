import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader/MainHeader';
import './root.scss';

function Root() {
  return (
    <>
      <MainHeader />
      <div id="main" className="container">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
