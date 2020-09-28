import React, { useState } from 'react';
import Header from '../components/Header';

const Profile = () => {

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const[email, setEmail] = useState(currentUser.email);
  const[name, setName] = useState(currentUser.name);
  const[succesMessage, setSuccesMessage] = useState('');

  const setLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return (
    <div>
      <Header title='Meu perfil' />
      <form id='update-form'>
        <label htmlFor="email">Email
          <input
            data-testid="profile-email-input"
            id="email"
            value={email}
            readOnly
          />
        </label>
        <label htmlFor="name">Name
        <input
            data-testid="profile-name-input"
            id="name"
            type="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button
          data-testid="profile-save-btn"
          type="button"
          onClick={async () => {
            const body = { "name": name }
            const headers = new Headers({
              "Content-Type": "application/json",
              "Content-Length": JSON.stringify(body).length,
              "Authorization": currentUser.token
            })
            const user = await
              fetch(`http://localhost:3001/users/${currentUser.email}`, { method: 'PUT', body: JSON.stringify(body), headers })
                .then((response) => response.json()
                  .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));;
            setLocalStorage(user);
            setSuccesMessage('Atualização concluída com sucesso');
          }}
          disabled={name === currentUser.name}
        >
          Salvar
        </button>
      </form>
      <p>{succesMessage}</p>
    </div>
  )
};

export default Profile;