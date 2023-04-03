import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import axios from 'axios';
import AppWrapper from './routes/appWrapper';
import ErrorPage from './components/errorPage';
import Main from './routes/main/main';
import About from './routes/about/about';
import Login from './routes/login/login';
import Signup from './routes/signup/signup';
import Dashboard from './routes/dashboard/dashboard';
import SymbolQuote from './routes/symbolQuote/symbolQuote';
import BuySell from './routes/buySell/buySell';
import Search from './routes/search/search';
import useToken from './utils/useToken';
import './index.scss';

function App() {
  const { token, removeToken, setToken } = useToken();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('/user', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        setUserId(response.data.user_id);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUserId();
    }
  }, [token]);

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
      ],
    },
    {
      path: '/app',
      element:
        token && token !== '' && token !== undefined ? (
          <AppWrapper token={token} removeToken={removeToken} />
        ) : (
          <Navigate to="/login" />
        ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/app',
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'stocks/:symbol',
          element: <SymbolQuote token={token} userId={userId} />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'search',
          element: <Search />,
          errorElement: <ErrorPage />,
        },
        {
          path: 'buy-sell',
          element: <BuySell userId={userId} />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login setToken={setToken} token={token} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element: <Signup />,
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
