import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => (
    password.length >= 6 && email.match(emailTest)
  );

  const setLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <div>
      <form id='login-form' method='POST'>
        <label htmlFor="email">Email
          <input
            data-testid="email-input"
            id="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password">Password
        <input
            data-testid="password-input"
            id="password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button
          data-testid="signin-btn"
          type="button"
          onClick={async () => {
            // const form = new FormData (document.getElementById('login-form'));
            const body = { "email": email, "password": password }
            const headers = new Headers({
              "Content-Type": "application/json",
              "Content-Length": JSON.stringify(body).length
            })
            const user = await
              fetch('http://localhost:3001/login', { method: 'POST', body: JSON.stringify(body), headers })
                .then((response) => response.json()
                  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));;
            setLocalStorage(user);
            if (user.role === 'administrator') {
              return props.history.push('/admin/orders');
            }
            return props.history.push('/products');
          }}
          disabled={!validateLogin()}
        >
          ENTRAR
        </button>
        <Link to='/register'>
          <button data-testId="no-account-btn">Ainda não tenho conta</button>
        </Link>
      </form>
    </div>
  )
};

export default Login;
