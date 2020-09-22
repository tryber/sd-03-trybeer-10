import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => (
    password.length >= 6 && email.match(emailTest)
  );

  const setLocalStorage = (name, email, token, role) => {
    localStorage.setItem('user', { name, email, token, role })
  }

  return (
    <div>
      {email}
      <form id='login-form' method='POST'>
        <input
          data-testid="email-input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          data-testid="password-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          data-testid="signin-btn"
          type="button"
          onClick={() => {
            // const form = new FormData (document.getElementById('login-form'));
            console.log(email, password);
            const test = email;
            const { name, emaild, token, role } =
              fetch('http://localhost:3001/login', { method: 'POST', body: `{ "test": ${test} , password }` })
                .then((response) => response.json()
                  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));;
            setLocalStorage(name, emaild, token, role);
            if (role === 'administrator') {
              return <Redirect to='/admin/home' />
            }
            return <Redirect to='/products' />
          }}
          disabled={!validateLogin()}
        >
          Entrar
        </button>
        <Link to='/register'>
          <button>Ainda não tenho conta</button>
        </Link>
      </form>
    </div>
  )
};

export default Login;
