import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

function Login(props: { setToken: (string) => void; token: string }) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (props.token) {
        navigate('/app');
        clearInterval(intervalId);
      }
    }, 100);
  }, [props.token, navigate]);

  const logUserIn = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: '/token',
      data: {
        email: loginForm.email,
        password: loginForm.password,
      },
    })
      .then((response) => {
        props.setToken(response.data.access_token);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setLoginForm({
      email: '',
      password: '',
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <h1 className="mb-4">Login</h1>
      <form className="d-flex flex-column justify-items-center">
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            id="emailInput"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={loginForm.password}
            id="passwordInput"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-danger" onClick={logUserIn}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
