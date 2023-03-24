import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.scss';

function Signup() {
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const signUserUp = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: '/signup',
      data: {
        firstname: signupForm.firstName,
        email: signupForm.email,
        password: signupForm.password,
      },
    })
      // .then((response) => {
      //   // do something here
      // })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    setSignupForm({
      firstName: '',
      email: '',
      password: '',
    });

    navigate('/login');
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSignupForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <h1 className="mb-4">Signup</h1>
      <form className="d-flex flex-column justify-items-center">
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            First Name
          </label>
          <input
            type="name"
            name="firstName"
            value={signupForm.firstName}
            id="nameInput"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={signupForm.email}
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
            value={signupForm.password}
            id="passwordInput"
            className="form-control"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-danger" onClick={signUserUp}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
