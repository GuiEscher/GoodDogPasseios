import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home/home';
import Login from './screens/Login/login';
import Register from './screens/Register/register'; // Importe a tela de cadastro
import NextWalks from './screens/Dashboard/next_walks';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
        <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
        <Route path="/register" element={<Register />} /> {/* Rota para a página de cadastro */}
        <Route path="/nextwalks" element={<NextWalks />} /> {/* Rota para a página de next walks */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;