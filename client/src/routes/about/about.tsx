import React, { useEffect } from 'react';
import { changeActiveLink } from '../../utils/changeActiveLink';

function About() {
  useEffect(() => {
    changeActiveLink('/about');
  });

  return <div>About Us</div>;
}

export default About;
