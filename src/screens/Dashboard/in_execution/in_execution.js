import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../../config/firebase'; // Importa o auth
import Header from '../../../components/header';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 
import './in_execution.css'; 

const InExecution = () => {
  const [walkDetails, setWalkDetails] = useState(null);
  const mapRef = useRef(null);
  const mapInitialized = useRef(false);
  const user = auth.currentUser; // Obtem o usuário logado

  L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.9.2/dist/images/';

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/inexecution?uid=${user.uid}`) // Filtra por UID
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setWalkDetails(data[0]);
          }
        })
        .catch((error) => console.error('Error fetching walk details:', error));
    }
  }, [user]);

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

            <div className="in-exec-details-buttons">
              <a href="#message" className="in-exec-details-button">Enviar mensagem</a>
              <a href="#problem_report" className="in-exec-details-button">Reportar problema</a>
            </div>
          </div>

          <div id="mapid" style={{ height: '400px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default InExecution;