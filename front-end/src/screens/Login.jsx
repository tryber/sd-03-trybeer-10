import React, { useState } from 'react';
import { Link, Redirect, useHistory} from 'react-router-dom';

const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

function Login (props) {
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
          onClick={async () => {
            // const form = new FormData (document.getElementById('login-form'));
            const body = {"email":email, "password":password}
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
              return props.history.push('/admin/home');
            }
            return props.history.push('/products');
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
