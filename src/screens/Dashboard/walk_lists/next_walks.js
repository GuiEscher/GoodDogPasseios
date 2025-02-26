import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../components/header';
import '../../../App.css';
import './next_walks.css';

const NextWalks = () => {
  const [walks, setWalks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/nextwalks')
      .then((response) => {
        setWalks(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar passeios:", error);
      });
  }, []);

  const filteredWalks = walks.filter((walk) =>
    walk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    walk.walker_details.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    walk.date.includes(searchTerm) ||
    walk.time.includes(searchTerm) ||
    walk.price.includes(searchTerm)
  );

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="content">
          <div className="tabs">
            <div className="search">
              <input
                type="text"
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button">
                <img src="/assets/searchicon.png" alt="Buscar" width="24" height="24" />
              </button>
            </div>
            <Link to='/register_walk' className="general-button">Agendar passeio</Link>
            <Link to='/nextwalks' className="tab-button active">Próximos</Link>
            <Link to='/previouswalks' className="tab-button">Anteriores</Link>
            <Link to='/in_execution' className="tab-button">Em andamento</Link>
          </div>

          <div className="selected-tab">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Nome do cachorro</th>
                  <th className="disposable-column">Cuidador</th>
                  <th className="disposable-column">Distância</th>
                  <th className="less-disposable-column">Valor</th>
                  <th>Data</th>
                  <th>Horário</th>
                </tr>
              </thead>
              <tbody>
                {filteredWalks.length > 0 ? (
                  filteredWalks.map((walk) => (
                    <tr key={walk.id}>
                      <td><Link to={`/next_walk_details/${walk.id}`} className="row-link">{walk.name}</Link></td>
                      <td className="disposable-column">{walk.walker_details.name}</td>
                      <td className="disposable-column">{walk.distance}</td>
                      <td className="less-disposable-column">{walk.price}</td>
                      <td>{walk.date}</td>
                      <td>{walk.time}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>Nenhum passeio encontrado</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextWalks;
