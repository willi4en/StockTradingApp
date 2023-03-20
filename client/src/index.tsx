import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './errorPage';
import Main from './routes/main/main';
import About from './routes/about/about';
import SymbolQuote from './routes/symbolLookup/symbolQuote';
import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/stocks/:symbol',
        element: <SymbolQuote />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
