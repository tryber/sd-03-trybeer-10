import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Sidebar = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push("/login");
  };
  return (
    <div className={ `side-menu-container ${sideMenu}` }>
      <Link to="/products">
        <button data-testid="side-menu-item-products">Produtos</button>
      </Link>
      <Link to="/orders">
        <button data-testid="side-menu-item-my-orders">Meus Pedidos</button>
      </Link>
      <Link to="/profile">
        <button data-testid="side-menu-item-my-profile">Meu Perfil</button>
      </Link>
      <Link to="/login">
        <button data-testid="side-menu-item-logout" onClick={() => handleLogout()}>Sair</button>
      </Link>
    </div>
  )
};

export default Sidebar;
