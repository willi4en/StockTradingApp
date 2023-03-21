import React, { useEffect } from 'react';
import { changeActiveLink } from '../../utils/helpers';

function About() {
  useEffect(() => {
    changeActiveLink('/about');
  });

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>About Us</h1>
    </div>
  );
}

export default About;
