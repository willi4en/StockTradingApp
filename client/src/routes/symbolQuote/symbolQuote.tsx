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
        <div className="flex-basis d-flex flex-column align-items-center justify-content-center text-end">
          <div className="text-start">
            <h2>Current price: ${quote.c.toFixed(2)}</h2>
            <h4>Opening price for the day: ${quote.o.toFixed(2)}</h4>
            <h4>High price of the day: ${quote.h.toFixed(2)}</h4>
            <h4>Low price of the day: ${quote.l.toFixed(2)}</h4>
            <h2 className="mt-5">
              Previous close price: ${quote.pc.toFixed(2)}
            </h2>
            <h4>
              Change in price (from previous close): ${quote.d.toFixed(2)}
            </h4>
            <h4>Percent change: {quote.dp}%</h4>
          </div>
        </div>
        <div className="flex-basis d-flex flex-column align-items-center justify-content-center px-5">
          <CandlestickChart symbol={pathname} />
        </div>
      </div>
    </div>
  );
}

export default SymbolQuote;
