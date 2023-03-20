import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  const pathname = useLocation().pathname.slice(1);

  useEffect(() => {
    fetch(`/${pathname}`)
      .then((res) => res.json())
      .then((data) => {
        setQuote(data);
      });
  }, []);

  return (
    <div>
      <h1>Quote Data For {pathname.toUpperCase()}</h1>
      <div>{quote.c}</div>
    </div>
  );
}

export default SymbolQuote;
