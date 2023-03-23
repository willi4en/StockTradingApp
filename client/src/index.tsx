import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppWrapper from './routes/appWrapper';
import ErrorPage from './components/errorPage';
import Main from './routes/main/main';
import About from './routes/about/about';
import SymbolQuote from './routes/symbolQuote/symbolQuote';
import Search from './routes/search/search';
import Login from './routes/login/login';
import Dashboard from './routes/dashboard/dashboard';
import Profile from './routes/profile/profile';
import useToken from './utils/useToken';
import './index.scss';

function App() {
  const { token, removeToken, setToken } = useToken();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppWrapper token={token} removeToken={removeToken} />,
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
        {
          path: '/search',
          element: <Search />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: '/app',
      element:
        token && token !== '' && token !== undefined ? (
          <AppWrapper token={token} removeToken={removeToken} />
        ) : (
          <Login setToken={setToken} />
        ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/app',
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'profile',
          element: <Profile />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login setToken={setToken} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
