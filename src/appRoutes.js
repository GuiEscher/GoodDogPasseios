import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home/home';
import Login from './screens/Login/login';
import Register from './screens/Register/register'; 
import NextWalks from './screens/Dashboard/next_walks';
import PreviousWalks from './screens/Dashboard/previous_walks';
import PreviousWalkDetails from './screens/Dashboard/previous_walk_details';
import NextWalkDetails from './screens/Dashboard/next_walk_details';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
        <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
        <Route path="/register" element={<Register />} /> {/* Rota para a página de cadastro */}
        <Route path="/nextwalks" element={<NextWalks />} /> {/* Rota para a página de next walks */}
        <Route path="/previouswalks" element={<PreviousWalks />} /> {/* Rota para a página de previous walks */}
        <Route path="/previous_walk_details/:id" element={<PreviousWalkDetails />} /> {/* Rota para as para as páginas de detalhes dos passeios */}
        <Route path="/next_walk_details/:id" element={<NextWalkDetails />} /> {/* Rota para as para as páginas de detalhes dos passeios */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;