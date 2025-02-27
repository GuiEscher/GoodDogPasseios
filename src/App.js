import React from 'react';
import AppRoutes from './appRoutes'; // Importe o arquivo de rotas
import './App.css'; // Importe os estilos globais
import Header from './components/header';

function App() {
  return (
    <div className="App">
      {/* Renderize o AppRoutes */}
      <AppRoutes />
    </div>
  );
}

// Exporte o componente App como padrão
export default App;