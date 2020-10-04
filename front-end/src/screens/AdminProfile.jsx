import React, { useEffect } from 'react';
import Header from '../components/Header';

const AdminProfile = (props) => {

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(!user) return props.history.push('/login');
  }, [])

  return (
    <div>
      <Header title="Perfil" />
      <h3 data-testid="profile-name">{`Nome: ${user.name}`}</h3>
      <h3 data-testid="profile-email">{`Email: ${user.email}`}</h3>
    </div>
  )

};

export default AdminProfile;
