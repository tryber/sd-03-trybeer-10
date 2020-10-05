import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import burgerMenuIcon from '../images/icons/burgerMenuIcon.svg';
import "../styles/Sidebar.css";

const toggleMenu = (sideMenu, setsideMenu) => {
  if (sideMenu === 'hide-side-menu') return setsideMenu('');
  return setsideMenu('hide-side-menu');
};

function AdminHeader({ title }) {

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push("/login");
  };

  return (
    <header className="header">
      <h1 data-testid="top-title" className="top-title">{title}</h1>
      <div className={ `side-menu-container` }>
        <Link to="/admin/orders">
          <button data-testid="side-menu-item-orders" className="menu-item">Meus Pedidos</button>
        </Link>
        <Link to="/admin/profile">
          <button data-testid="side-menu-item-profile" className="menu-item">Meu Perfil</button>
        </Link>
        <button data-testid="side-menu-item-logout" className="menu-item logout-btn" type="button" onClick={() => handleLogout()}>
          Sair
        </button>
      </div>
    </header>
  )
};

export default AdminHeader;