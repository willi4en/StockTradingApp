import React, { useState, useEffect } from 'react';
import './App.scss';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time')
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
  });

  return (
    <div className="container">
      <div>This app works!</div>
      <div>The current time is: {currentTime} </div>
    </div>
  );
}

export default App;
