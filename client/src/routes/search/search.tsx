import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import changeActiveLink from '../../utils/changeActiveLink';
import './search.scss';

function Search() {
  const [searchParams, setSearchParams]: [URLSearchParams, any] =
    useSearchParams();
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const stock = searchParams.get('stock');

  useEffect(() => {
    changeActiveLink('/app/search');
  });

  useEffect(() => {
    async function getStocks() {
      await fetch(`/search?symbol=${stock}`)
        .then((res) => res.json())
        .then((data) => {
          setStockData(data);
          setIsLoading(false);
        });
    }

    if (stock) {
      setIsLoading(true);
      setStockData(null);
      getStocks();
    }
  }, [stock]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    setSearchParams(formJson);
  };

  return (
    <div
      className={
        'd-flex flex-column align-items-center ' +
        (!stockData ? 'center-search' : '')
      }
    >
      <h1 className="mb-4 justify-self-start mt-auto">Search for Stocks</h1>
      {!stockData && !isLoading && (
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            name="stock"
            type="search"
            placeholder="Type stock name/ticker"
            aria-label="Search"
          />
          <button className="btn btn-outline-danger" type="submit">
            Search
          </button>
        </form>
      )}
      {isLoading && <div>Loading...</div>}
      {stockData && (
        <div className="d-flex flex-column align-items-center">
          <h4>Total Results: {stockData.count}</h4>
          <h6>
            PLEASE NOTE: Not all stocks provided by the Finnhub API are
            publically available
          </h6>
          <h6 className="mb-4">
            If the stock details page shows nothing but zeros that stock is not
            available to the public
          </h6>
          <ul className="list-group">
            {stockData.result.map((stock) => (
              <li key={stock.symbol} className="list-group-item d-flex">
                <div className="me-5">
                  <p className="mx-0 my-3">
                    Stock Symbol: {stock.displaySymbol}
                  </p>
                  <p className="mx-0 my-3">
                    Stock Description: {stock.description}
                  </p>
                </div>
                <a
                  className="btn btn-danger ms-auto align-self-center"
                  href={`/app/stocks/${stock.displaySymbol}`}
                >
                  View Stock Details
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
