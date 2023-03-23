import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader/MainHeader';
import './appWrapper.scss';

function AppWrapper(props) {
  return (
    <>
      <MainHeader {...props} />
      <div id="main" className="main">
        <Outlet />
      </div>
    </>
  );
}

export default AppWrapper;
