import React, { useEffect, useState } from 'react';
import changeActiveLink from '../../utils/changeActiveLink';
import axios from 'axios';

function BuySell(props: { userId: number }) {
  const [count, setCount] = useState(0);
  const [buys, setBuys] = useState([]);
  const [sells, setSells] = useState([]);

  useEffect(() => {
    changeActiveLink('/app/buy-sell');
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get(`/get-buys`, {
        params: {
          user_id: props.userId,
        },
      })
      .then((response) => {
        setBuys(response.data);
      });
    axios
      .get(`/get-sells`, {
        params: {
          user_id: props.userId,
        },
      })
      .then((response) => {
        setSells(response.data);
      });
  }, [props.userId]);

  return (
    <div className="container d-flex flex-column align-items-center center-content">
      <h1>Your Buys & Sells</h1>
      <div className="d-flex w-100 justify-content-around mt-3">
        <div className="text-center">
          <h2 className="mb-3">
            <u>Buys</u>
          </h2>
          {buys.map((buy) => (
            <h5 key={buy.id} className="mb-3">
              Bought {buy.stock} on {buy.bought_at} for {buy.price}
            </h5>
          ))}
        </div>
        <div className="text-center">
          <h2 className="mb-3">
            <u>Sells</u>
          </h2>
          {sells.map((sell) => (
            <h5 key={sell.id} className="mb-3">
              Sold {sell.stock} on {sell.sold_at} for {sell.price}
            </h5>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuySell;
