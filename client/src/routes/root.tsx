import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader/MainHeader';
import './root.scss';

function Root() {
  return (
    <>
      <MainHeader />
      <div id="main" className="d-flex flex-column h-100 p-4">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
