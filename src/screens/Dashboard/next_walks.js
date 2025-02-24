import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import '../../App.css';
import './next_walks.css';

const NextWalks = () => {
  const walks = [
    { id: 1, name: 'Rabixo', caregiver: 'Jurandir', distance: '5 km', price: 'R$ 60,00', date: '28/11/2024', time: '18:00' },
    { id: 2, name: 'Pelotas', caregiver: 'Marilde', distance: '5 km', price: 'R$ 60,00', date: '29/11/2024', time: '15:00' },
    { id: 3, name: 'Bibinho', caregiver: 'Márcio', distance: '5 km', price: 'R$ 60,00', date: '30/11/2024', time: '19:00' }
  ];

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/dashboard/next_walks" className="active">Seus passeios</Link></li>
            <li><Link to="/">Logout</Link></li>
          </ul>
        </nav>

        <div className="content">
          <div className="tabs">
            <div className="search">
              <input type="text" placeholder="Buscar" />
              <button className="search-button"><img src="/assets/searchicon.png" alt="Buscar" width="24" height="24" /></button>
            </div>
            <Link to='/dashboard/register_walk' className="general-button">Agendar passeio</Link>
            <Link to='/dashboard/next_walks' className="tab-button active">Próximos</Link>
            <Link to='/dashboard/previous_walks' className="tab-button">Anteriores</Link>
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
                    <td><Link to="/dashboard/future_walk_details" className="row-link">{walk.name}</Link></td>
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

export default NextWalks;
