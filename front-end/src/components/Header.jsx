import React from 'react';
import { Link } from 'react-router-dom';
import burgerMenuIcon from '../images/icons/burgerMenuIcon.svg';

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <div class="side-menu-container">
        <img data-testid="top-hamburguer" alt="Menu button" src={burgerMenuIcon} />
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
          <button data-testid="side-menu-item-logout">Sair</button>
        </Link>
      </div>
    </header>
  )
};

export default Header;
