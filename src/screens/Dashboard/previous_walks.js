import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header';
import '../../App.css';
import './css/next_walks.css';

const PreviousWalks = () => {
  const [walks, setWalks] = useState([]);

  useEffect(() => {
    // Buscar dados do json-server
    axios.get('http://localhost:5000/previouswalks')
      .then((response) => {
        setWalks(response.data); // Atualiza o estado com os dados dos passeios
      })
      .catch((error) => {
        console.error("Erro ao buscar passeios:", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="content">
          <div className="tabs">
            <div className="search">
              <input type="text" placeholder="Buscar" />
              <button className="search-button"><img src="/assets/searchicon.png" alt="Buscar" width="24" height="24" /></button>
            </div>
            <Link to='/dashboard/register_walk' className="general-button">Agendar passeio</Link>
            <Link to='/nextwalks' className="tab-button">Próximos</Link>
            <Link to='/previouswalks' className="tab-button active">Anteriores</Link>
            <Link to='/dashboard/in_execution' className="tab-button">Em andamento</Link>
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
                {walks.map((walk) => (
                  <tr key={walk.id}>
                    <td><Link to={`/previous_walk_details/${walk.id}`} className="row-link">{walk.name}</Link></td>
                    <td className="disposable-column">{walk.caregiver}</td>
                    <td className="disposable-column">{walk.distance}</td>
                    <td className="less-disposable-column">{walk.price}</td>
                    <td>{walk.date}</td>
                    <td>{walk.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousWalks;
