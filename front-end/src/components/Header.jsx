import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import burgerMenuIcon from '../images/icons/burgerMenuIcon.svg';
import "../styles/sidebar.css";
// import Sidebar from './Sidebar';

const toggleMenu = (sideMenu, setsideMenu) => {
  if (sideMenu === 'hide-side-menu') return setsideMenu('');
  return setsideMenu('hide-side-menu');
};

function Header({ title }) {

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    history.push("/login");
  };

  const [sideMenu, setsideMenu] = React.useState('hide-side-menu');
  
  return (
    <header>
      <h1 data-testid="top-title">{title}</h1>
      <img data-testid="top-hamburguer"
        alt="Menu button" src={burgerMenuIcon}
        onClick={() => toggleMenu(sideMenu, setsideMenu)}
      />
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
      <button data-testid="side-menu-item-logout" type="button" onClick={() => handleLogout()}>
        Sair
      </button>
    </div>
    </header>
  )
};

export default Header;
// based on https://medium.com/javascript-in-plain-english/create-a-reusable-sidebar-component-with-react-d75cf48a053a and Leticia Lima Pull Request at https://github.com/tryber/sd-03-trybeer-1/pull/9/files
