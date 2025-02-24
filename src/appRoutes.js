import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home/home';
import Login from './screens/Login/login';
import Register from './screens/Register/register'; 
import NextWalks from './screens/Dashboard/walk_lists/next_walks';
import PreviousWalks from './screens/Dashboard/walk_lists/previous_walks';
import PreviousWalkDetails from './screens/Dashboard/walk_details/previous_walk_details';
import NextWalkDetails from './screens/Dashboard/walk_details/next_walk_details';
import InExecution from './screens/Dashboard/in_execution/in_execution';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Rota para a página inicial */}
        <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
        <Route path="/register" element={<Register />} /> {/* Rota para a página de cadastro */}
        <Route path="/nextwalks" element={<NextWalks />} /> {/* Rota para a página de next walks */}
        <Route path="/previouswalks" element={<PreviousWalks />} /> {/* Rota para a página de previous walks */}
        <Route path="/previous_walk_details/:id" element={<PreviousWalkDetails />} /> {/* Rota para as para as páginas de detalhes dos passeios agendados */}
        <Route path="/next_walk_details/:id" element={<NextWalkDetails />} /> {/* Rota para as para as páginas de detalhes dos passeios passados */}
        <Route path="/in_execution" element={<InExecution />} /> {/* Rota para as para as páginas de detalhes do passeio em andamento */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;