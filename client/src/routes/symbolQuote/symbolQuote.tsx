import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CandlestickChart from '../../components/CandlestickChart/CandlestickChart';
import './symbolQuote.scss';
import axios from 'axios';

function SymbolQuote(props: { token: string; userId: number }) {
  const [count, setCount] = useState(0);
  const [buys, setBuys] = useState([]);
  const [sells, setSells] = useState([]);
  const [quote, setQuote] = useState({
    c: 0,
    d: 0,
    dp: 0,
    h: 0,
    l: 0,
    o: 0,
    pc: 0,
    t: 0,
  });
  const pathname = useLocation().pathname.slice(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios.get(`/stocks/${pathname}`).then((response) => {
      setQuote(response.data);
    });
  }, [pathname, count]);

  useEffect(() => {
    axios
      .get(`/get-buys/${pathname}`, {
        params: {
          user_id: props.userId,
        },
      })
      .then((response) => {
        setBuys(response.data);
      });
    axios
      .get(`/get-sells/${pathname}`, {
        params: {
          user_id: props.userId,
        },
      })
      .then((response) => {
        setSells(response.data);
      });
  }, [pathname, props.userId, count]);

  const buyStock = (event) => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/buy',
      data: {
        stock: pathname.toUpperCase(),
        price: quote.c.toFixed(2),
        user_id: props.userId,
      },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  };

  const sellStock = (event) => {
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/sell',
      data: {
        stock: pathname.toUpperCase(),
        price: quote.c.toFixed(2),
        user_id: props.userId,
      },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  };

  return (
    <div className="w-100 d-flex flex-column flex-1">
      <h1 className="text-center">Quote Data For {pathname.toUpperCase()}</h1>
      <div className="d-flex flex-grow-1">
        <div className="flex-basis-1 d-flex flex-column align-items-center justify-content-center text-end px-5">
          <div className="text-start mb-5">
            <h2>
              <u>Current price:</u> ${quote.c.toFixed(2)}
            </h2>
            <h4>Opening price for the day: ${quote.o.toFixed(2)}</h4>
            <h4>High price of the day: ${quote.h.toFixed(2)}</h4>
            <h4>Low price of the day: ${quote.l.toFixed(2)}</h4>
            <h2 className="mt-5">
              <u>Previous close price:</u> ${quote.pc.toFixed(2)}
            </h2>
            <h4>
              Change in price (from previous close): ${quote.d.toFixed(2)}
            </h4>
            <h4>Percent change: {quote.dp}%</h4>
          </div>
          <form onSubmit={buyStock}>
            <button className="my-5 btn btn-danger btn-lg fs-2" type="submit">
              Buy this stock for ${quote.c.toFixed(2)}
            </button>
          </form>
          <form onSubmit={sellStock}>
            <button className="my-5 btn btn-danger btn-lg fs-2" type="submit">
              Sell this stock for ${quote.c.toFixed(2)}
            </button>
          </form>
        </div>
        <div className="flex-basis-2 d-flex flex-column align-items-center justify-content-center px-5 mt-5">
          <CandlestickChart symbol={pathname} />
          <div className="w-100 text-center my-5">
            <h5 className="mb-4">
              Buy/Sell activity for {pathname.toUpperCase()}
            </h5>
            <div className="d-flex w-100 justify-content-evenly">
              <div className="text-center">
                <h6>
                  <u>Buys</u>
                </h6>
                {buys.map((buy) => (
                  <p key={buy.bought_at}>
                    Bought on {buy.bought_at} for {buy.price}
                  </p>
                ))}
              </div>
              <div className="text-center">
                <h6>
                  <u>Sells</u>
                </h6>
                {sells.map((sell) => (
                  <p key={sell.sold_at}>
                    Sold on {sell.sold_at} for {sell.price}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymbolQuote;
