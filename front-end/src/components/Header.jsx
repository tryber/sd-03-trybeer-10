import React from 'react';
import { Link } from 'react-router-dom';
import burgerMenuIcon from '../images/icons/burgerMenuIcon.svg';
import "../styles/sidebar.css";

const Sidebar = ({ width, height, children }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height
        }}
      >
        <img data-testid="top-hamburguer"
          alt="Menu button" src={burgerMenuIcon}
          className="toggle-menu"
          style={{ transform: `translate(${width}px, 20vh)` }}
          onClick={() => toggleMenu()}
        />
        <div className="content">{children}</div>
      </div>
    </React.Fragment>
  );
};

function Header({ title }) {
  return (
    <header>
      <h1 data-testid="top-title">{title}</h1>
      {/* <img data-testid="top-hamburguer"
        alt="Menu button" src={burgerMenuIcon}
        onClick={() => toggleMenu()}
      /> */}
      <Sidebar class="side-menu-container" width={300} height={"100vh"}>
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
      </Sidebar>
    </header>
  )
};

export default Header;
