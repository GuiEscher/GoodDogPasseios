import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/assets/logo.png" alt="GoodDog Passeios" />
          <Link to="/" className="site-name">GoodDog Passeios</Link>
        </div>
        <ul className="nav-links">
          {!isLoginOrRegister && <li><Link to="/nextwalks">Seus Passeios</Link></li>}
          <li><Link to="/#sobre">Sobre</Link></li>
          {!isLoginOrRegister && <li><Link to="/">Logout</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
