import { Redirect } from 'react-router-dom';
import React, { useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';

const AdminProfile = (props) => {

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log(user);
    if(!user) return props.history.push('/login');
  }, [])

  if (!user) return <Redirect to="/login" />
  return (
    <div>
      <AdminHeader title="Perfil" />
      <h3 data-testid="profile-name">{`Nome: ${user.name}`}</h3>
      <h3 data-testid="profile-email">{`Email: ${user.email}`}</h3>
    </div>
  )

};

export default AdminProfile;
