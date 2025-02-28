import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import Header from '../../../components/header';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './in_execution.module.css';

const InExecution = () => {
  const [walkDetails, setWalkDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const mapInitialized = useRef(false);
  const user = auth.currentUser;
  const navigate = useNavigate();

  // Definindo o ícone padrão do Leaflet
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/inexecution?uid=${user.uid}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setWalkDetails(data[0]);
          }
        })
        .catch((error) => console.error('Error fetching walk details:', error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
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

      // Criando o mapa com Leaflet
      const map = L.map(styles['mapid']).setView([latitude, longitude], 13);
      mapRef.current = map;
      mapInitialized.current = true;

      // Adicionando os tiles do OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; OpenStreetMap contributors',
        maxZoom: 20,
      }).addTo(map);

      // Adicionando o marcador
      L.marker([latitude, longitude]).addTo(map);
    }
  }, [walkDetails]);

  if (loading) {
    return <div className={styles["error-message"]}>Carregando...</div>;
  }

  if (!walkDetails) {
    return (
      <div>
        <Header />
        <div className={styles["dashboard-container"]}>
          <div className={styles["error-message"]}>
            <button onClick={() => window.history.back()} className={styles["return-button"]}>
              &lt; Voltar
              <p style={{ color: 'black' }}>Nenhum passeio foi encontrado nesse momento.</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles["dashboard-container"]}>
        <div className={styles["walk-content"]}>
          <div className={styles["left-column"]}>
            <div className={styles["full-walk-details"]}>
              <div className={styles["walk-details"]}>
                <button onClick={() => window.history.back()} className={styles["return-button"]}>
                  &lt; Voltar
                </button>
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

              <div className={styles["in-exec-details-buttons"]}>
                <a href="#message" className={styles["in-exec-details-button"]}>Enviar mensagem</a>
                <a href="#problem_report" className={styles["in-exec-details-button"]}>Reportar problema</a>
              </div>
            </div>
          </div>

          <div className={styles["right-column"]}>
            <div id={styles["mapid"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InExecution;