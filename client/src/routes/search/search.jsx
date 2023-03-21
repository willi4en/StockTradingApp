import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stockName, setStockName] = useState(null);
  const [stockData, setStockData] = useState(null);

  let symbol = searchParams.get('symbol');

  useEffect(() => {
    async function getStocks() {
      await fetch(`/search`)
        .then((res) => res.json())
        .then((data) => {
          setStockData(data);
        });
    }

    if (symbol) {
      getStocks();
    }
  }, [symbol]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setSearchParams(formJson);
    setStockName(formJson.symbol);
  };

  return (
    <>
      <h1 className="mb-4 justify-self-start">Search For Stocks</h1>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          name="symbol"
          type="search"
          placeholder="Type stock name/ticker"
          aria-label="Search"
        />
        <button className="btn btn-outline-danger" type="submit">
          Search
        </button>
      </form>
      {stockData && <div>This works!</div>}
    </>
  );
}

export default Search;
