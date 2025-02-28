import React from "react";
import { auth } from '../config/firebase';

const Header = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Faz o logout no Firebase
      window.location.href = "/login"; // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
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
          {user && (
            <li>
              <a href="/" onClick={(e) => {
                e.preventDefault(); // Evita o comportamento padrão do link
                handleLogout(); // Chama a função de logout
              }}>
                Logout
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;