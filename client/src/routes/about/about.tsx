import React, { useEffect } from 'react';
import changeActiveLink from '../../utils/changeActiveLink';

function About() {
  useEffect(() => {
    changeActiveLink('/about');
  });

  return (
    <div className="container flex-grow-1 text-center">
      <h1 className="mb-5">About Us</h1>
      <div className="row">
        <div className="col">
          <h3>Jordan Myers</h3>
        </div>
        <div className="col">
          <h3>Ethan Williams</h3>
        </div>
        <div className="col">
          <h3>FireStock</h3>
        </div>
      </div>
    </div>
  );
}

export default About;
