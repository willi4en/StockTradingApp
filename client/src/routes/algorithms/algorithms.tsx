import React, { useEffect, useState } from 'react';
import changeActiveLink from '../../utils/changeActiveLink';
import './algorithms.scss';
import Algorithm from './AlgorithmObject'

function Algorithms() {
  useEffect(() => {
    changeActiveLink('/app/algorithms');
  });

  const [algorithms, setAlgorithm] = useState([])

  const handleAddAlgorithm = () => {
    const algorithm = {
      id: self.crypto.randomUUID(),
      name: "Algorithm " + (algorithms.length + 1),
      rules: []
    }
    setAlgorithm([algorithm, ...algorithms])
    console.log("New Algorithm:", algorithm)
  }

  const handleDeleteAlgorithm = (id) => {
    setAlgorithm(algorithms.filter(algorithm => algorithm.id !== id))
    console.log("Delete Algorithm", id)
  }

  const handleRunClick = (algorithm) => {
    console.log(algorithm);
  }

  return (
    <div className="container d-flex flex-column flex-grow-1 align-items-center">
      <h1>Trading Algorithms</h1>
      <div className="main-container">
        <div className="algorithm-container">
          <label className="algorithm-label">Rules</label>
          <div className="button-center">
            <button className="create-button" onClick={handleAddAlgorithm}>+</button>
          </div>          
        </div>
        {algorithms.map(algorithm => (
          <Algorithm
          handleDelete={handleDeleteAlgorithm}
          handleRunClick={handleRunClick}
          key={algorithm.id}
          {...algorithm}
          />
        ))}
      </div>
    </div>
  );
}

export default Algorithms;
