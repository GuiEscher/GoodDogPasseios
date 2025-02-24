import React, { useState, useEffect, useRef } from 'react';
import Header from '../../../components/header';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // O CSS do Leaflet ainda é necessário, mas será isolado no contêiner
import './in_execution.css'; // Importando o CSS Module

const InExecution = () => {
  const [walkDetails, setWalkDetails] = useState(null);
  const mapRef = useRef(null); 
  const mapInitialized = useRef(false);

  L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.2/dist/images/';

  useEffect(() => {
    fetch('http://localhost:5000/inexecution')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setWalkDetails(data[0]);
        }
      })
      .catch((error) => console.error('Error fetching walk details:', error));
  }, []);

  useEffect(() => {
    if (walkDetails && !mapInitialized.current) {
      const defaultCoords = [-21.9810, -47.8795];
      const [latitude, longitude] = walkDetails.location || defaultCoords;

      if (isNaN(latitude) || isNaN(longitude)) {
        console.error("Invalid coordinates:", walkDetails.location);
        return;
      }

      const map = L.map('mapid').setView([latitude, longitude], 13);
      mapRef.current = map;
      mapInitialized.current = true;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
        maxZoom: 20,
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map);
    }
  }, [walkDetails]);

  if (!walkDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
      <div className="walk-content">
        <div className="full-walk-details">
          <div className="walk-details">
            <a href="/previouswalks" className="return-button">
              &lt; Voltar
            </a>
            <h1>Detalhes do passeio</h1>
            <p>Nome do Cachorro: {walkDetails.dogName}</p>
            <p>Características: {walkDetails.dogDetails}</p>
            <p>Data: {walkDetails.date}</p>
            <p>Horário de Início: {walkDetails.startTime}</p>
            <p>Horário para término: {walkDetails.endTime}</p>
            <p>Passeador: {walkDetails.walker}</p>
            <p>Distância solicitada: {walkDetails.distance}</p>
            <p>Valor: {walkDetails.price}</p>
          </div>

          <div className="details-buttons">
            <a href="#message" className="details-button">Enviar mensagem</a>
            <a href="#problem_report" className="details-button">Reportar problema</a>
          </div>
        </div>

        <div id="mapid" style={{ height: '400px', }}></div>
      </div>

      </div>
    </div>
  );
};

export default InExecution;