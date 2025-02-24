import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/assets/logo.png" alt="GoodDog Passeios" />
          <Link to="/" className="site-name">GoodDog Passeios</Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/#sobre">Sobre</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;