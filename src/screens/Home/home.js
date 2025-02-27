import React from 'react';
import Header from '../../components/header';

const Home = () => {
  return (
    <div>
      {/* Cabeçalho */}
      <Header />

      
      {/* Seção principal com a imagem e texto */}
      <section className="main-banner">
        <img src="../../assets/banner.jpg" alt="Cachorro em passeio" />
        <div className="banner-content">
          <p>Passeios com seu cachorro ajudam a melhorar seu comportamento</p>
          <a href="/login">
            <button>Buscar Passeador</button>
          </a>
        </div>
      </section>

      {/* Seção 'Sobre' */}
      <section id="sobre" className="about-section">
        <h2>Sobre o GoodDog Passeios</h2>
        <p>
          O GoodDog Passeios é uma plataforma que conecta donos de cachorros a passeadores de confiança.
          Aqui, você pode agendar passeios para seu cachorro de forma prática e segura. Além disso, você
          poderá acompanhar o passeio em tempo real via GPS, garantindo segurança e tranquilidade.
        </p>
      </section>
    </div>
  );
};

export default Home;