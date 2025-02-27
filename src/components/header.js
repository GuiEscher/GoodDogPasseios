import React from "react";
import { auth } from '../config/firebase';

const Header = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src="/assets/logo.png" alt="GoodDog Passeios" />
          <a href="/" className="site-name">GoodDog Passeios</a>
        </div>
        <ul className="nav-links">
          <li><a href="/#sobre">Sobre</a></li>
          {user && <li><a href="/nextwalks">Seus Passeios</a></li>}
          {user && <li><a href="/">Logout</a></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
