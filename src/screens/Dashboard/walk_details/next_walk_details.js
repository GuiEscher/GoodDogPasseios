import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../../components/header'; // Assumindo que você tenha o componente Header
import '../../../App.css';
import './details.css'; // Caminho do arquivo CSS

const NextWalkDetails = () => {
  const { id } = useParams(); // Pega o 'id' da URL
  const [walkDetails, setWalkDetails] = useState(null);

  useEffect(() => {
    // Aqui a URL é de onde os dados dos passeios agendados podem ser buscados
    fetch('http://localhost:5000/nextwalks')
      .then((response) => response.json())
      .then((data) => {
        const walk = data.find((w) => w.id === parseInt(id)); // Filtra pelo id
        setWalkDetails(walk);
      })
      .catch((error) => console.error('Error fetching walk details:', error));
  }, [id]);

  if (!walkDetails) {
    return <div>Loading...</div>; // Exibe uma mensagem enquanto os dados estão sendo carregados
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="content">
          <div className="details-sections">
            <div className="details-div">
              <a href="/nextwalks" className="return-button">&lt; Voltar</a>

              <h1>Detalhes do passeio</h1>
              <p>Nome do Cachorro: {walkDetails.name}</p>
              <p>Características: {walkDetails.dog_details.characteristics}</p>
              <p>Data: {walkDetails.date}</p>
              <p>Horário de Início: {walkDetails.time}</p>
              <p>Horário para término: {walkDetails.end_time}</p>
              <p>Local de partida: {walkDetails.location}</p>
              <p>Distância solicitada: {walkDetails.distance}</p>
            </div>

            <div className="details-div">
              <h2>Valor</h2>
              <p>{walkDetails.price}</p>
            </div>
          </div>

          <div className="details-sections">
            <div className="details-div">
              <h1>Detalhes do passeador</h1>
              <p>Nome: {walkDetails.caregiver}</p>
              <p>Avaliação: {walkDetails.walker_details.rating}</p>
              <p>Detalhes: {walkDetails.walker_details.description}</p>
            </div>

            <div className="details-div">
              <img
                src={walkDetails.walker_details.image}
                alt="Foto do passeador"
                className="walker-image"
              />
            </div>
          </div>

          <div className="details-buttons">
            <a className="details-button">Solicitar alteração</a>
            <a className="details-button">Conversar</a>
            <a className="details-button-cancel">Cancelar</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextWalkDetails;
