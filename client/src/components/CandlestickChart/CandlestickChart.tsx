import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './CandlestickChart.scss';

const CandlestickChart = (props: { symbol: string }) => {
  const [data, setData] = useState({});
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const [parentWidth, setParentWidth] = useState(0);
  const seriesList = [];

  const fetchJson = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      fetch(`/candlestick/${props.symbol}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          for (let i = 0; i < data.c.length; i++) {
            seriesList.push([
              data.t[i],
              data.o[i],
              data.h[i],
              data.l[i],
              data.c[i],
            ]);
          }
          setSeries([
            {
              name: 'candles',
              data: seriesList,
            },
          ]);
          resolve();
        })
        .catch((error) => reject(error));
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setParentWidth(document.getElementById('chart-container').offsetWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchJson().then(() => {
      setOptions({
        chart: {
          type: 'candlestick',
          height: 500,
          width: parentWidth,
          id: 'candles',
          toolbar: {
            show: true,
          },
        },
        title: {
          text: `Candlestick Chart (1yr) - ${props.symbol}`,
          align: 'center',
          style: {
            fontFamily: 'Poppins',
            fontSize: '18px',
            color: 'white',
            fontWeight: '400',
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            show: false,
          },
        },
        yaxis: {
          tooltip: {
            enabled: false,
          },
        },
        fontFamily: 'Poppins',
      });

      setSeries([
        {
          name: 'candles',
          data: seriesList,
        },
      ]);
    });
  }, [props.symbol]);

  return (
    <div id="chart-container" className="chart-container">
      <ReactApexChart
        type="candlestick"
        options={options}
        series={series}
        height={500}
      />
    </div>
  );
};

export default CandlestickChart;
