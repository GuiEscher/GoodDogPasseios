import React from "react";
import { auth } from '../config/firebase';
import './header.css'; // Importação correta

const Header = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <header>
      <nav>
        <a href="/" className="logo">
          <img src="/assets/logo.png" alt="GoodDog Passeios" />
          <p className="site-name">GoodDog Passeios</p>
        </a>
        <ul className="nav-links">
          {!user && <li><a href="/#sobre">Sobre</a></li>}
          {user && <li><a href="/nextwalks">Seus Passeios</a></li>}
          {user && (
            <li>
              <a href="/" onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}>
                Logout
              </a>
            </li>
          )}
          {!user && <li><a href="/login">Login</a></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
