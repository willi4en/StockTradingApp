import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CandlestickChart from '../../components/CandlestickChart/CandlestickChart';
import './symbolQuote.scss';

function SymbolQuote() {
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
    fetch(`/stocks/${pathname}`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      });
  }, []);

  return (
    <div className="w-100 d-flex flex-column flex-1">
      <h1 className="text-center">Quote Data For {pathname.toUpperCase()}</h1>
      <div className="d-flex flex-grow-1">
        <div className="flex-basis-1 d-flex flex-column align-items-center justify-content-center text-end px-5">
          <div className="text-start">
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
        </div>
        <div className="flex-basis-2 d-flex flex-column align-items-center justify-content-start px-5 mt-5">
          <CandlestickChart symbol={pathname} />
          <h5 className="mb-4">
            Buy/Sell activity for {pathname.toUpperCase()}
          </h5>
          <div className="d-flex w-100 justify-content-evenly">
            <div className="text-center">
              <h6>
                <u>Buys</u>
              </h6>
              <p>
                Bought on {} for {}
              </p>
            </div>
            <div className="text-center">
              <h6>
                <u>Sells</u>
              </h6>
              <p>
                Sold on {} for {}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SymbolQuote;
