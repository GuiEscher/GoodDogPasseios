import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../../config/firebase'; // Importa o auth
import Header from '../../components/header';
import '../../App.css';
import './register_walk.css';

const RegisterWalk = () => {
  const navigate = useNavigate();
  const user = auth.currentUser; // Obtem o usuário logado

  const [walkid, setId] = useState(null);
  const [name, setName] = useState('');
  const [caregiver, setCaregiver] = useState('');
  const [distance, setDistance] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');
  const [characteristics, setCharacteristics] = useState('');

  const [randomWalker, setRandomWalker] = useState(null);
  const [calculatedPrice, setCalculatedPrice] = useState('R$0,00');

  useEffect(() => {
    axios.get('http://localhost:5000/nextwalks')
      .then((response) => {
        const walks = response.data;

        if (walks.length > 0) {
          const maxId = Math.max(...walks.map(walk => Number(walk.id)));
          setId(maxId + 1);

          const randomWalk = walks[Math.floor(Math.random() * walks.length)];
          setRandomWalker(randomWalk.walker_details);
        } else {
          setId(1);
        }
      })
      .catch((error) => console.error('Erro ao buscar passeios:', error));
  }, []);

  // Atualiza o preço e horário de término conforme a distância muda
  useEffect(() => {
    if (distance) {
      const km = parseFloat(distance);
      if (!isNaN(km) && km > 0) {
        const price = km * 15;
        setCalculatedPrice(`R$${price.toFixed(2)}`);

        if (time) {
          const [hh, mm] = time.split(':').map(Number);
          const totalMinutes = mm + km * 15;
          const newHour = hh + Math.floor(totalMinutes / 60);
          const newMinutes = totalMinutes % 60;
          setEndTime(`${newHour.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`);
        }
      }
    } else {
      setCalculatedPrice('R$0,00');
      setEndTime('');
    }
  }, [distance, time]);

  const handleDateChange = (event) => {
    const rawDate = event.target.value; // yyyy-mm-dd
    const [year, month, day] = rawDate.split('-');
    setDate(`${day}/${month}/${year}`); // Armazena no formato dd/mm/aaaa
  };

  const isValidDate = (selectedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [day, month, year] = selectedDate.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    return inputDate >= today;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValidDate(date)) {
      alert('A data não pode ser anterior à data atual!');
      return;
    }

    if (!user) {
      alert('Usuário não autenticado. Faça login para cadastrar um passeio.');
      return;
    }

    const newWalk = {
      id: walkid,
      uid: user.uid, // Adiciona o uid do usuário logado
      name,
      caregiver: randomWalker ? randomWalker.name : '',
      distance,
      price: calculatedPrice,
      date,
      time,
      end_time,
      location,
      dog_details: { name, breed, characteristics },
      walker_details: randomWalker || { name: '', rating: '', description: '', image: '' },
    };

    axios.post('http://localhost:5000/nextwalks', newWalk)
      .then(() => navigate('/nextwalks'))
      .catch((error) => console.error('Erro ao cadastrar passeio:', error));
  };

  return (
    <div>
      <Header />
      <section className="cadastro-section">
        <div className="cadastro-box">
          
          <form className="cadastro-form" onSubmit={handleSubmit}>
            <h2>Cadastrar Passeio</h2>
            <button onClick={() => window.history.back()}>
                Voltar
            </button>
            
            <div className="cadastro-flex">
              <div className="cadastro-card">
                <h2>Informações do Cachorro</h2>
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nome do Cachorro"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
                <label htmlFor="breed">Raça</label>
                <input
                  type="text"
                  id="breed"
                  placeholder="Raça do Cachorro"
                  value={breed}
                  onChange={(event) => setBreed(event.target.value)}
                  required
                />
                <label>Características</label>
                <div className="input-checkbox">
                  <div>
                    <input
                      type="radio"
                      id="opcao_amigavel"
                      name="characteristics"
                      value="Amigável"
                      onChange={(event) => setCharacteristics(event.target.value)}
                    />
                    <label htmlFor="opcao_amigavel">Amigável</label>
                  </div>
                  <hr />
                  <div>
                    <input
                      type="radio"
                      id="opcao_calmo"
                      name="characteristics"
                      value="Calmo"
                      onChange={(event) => setCharacteristics(event.target.value)}
                    />
                    <label htmlFor="opcao_calmo">Calmo</label>
                  </div>
                  <hr />
                  <div>
                    <input
                      type="radio"
                      id="opcao_agitado"
                      name="characteristics"
                      value="Agitado"
                      onChange={(event) => setCharacteristics(event.target.value)}
                    />
                    <label htmlFor="opcao_agitado">Agitado</label>
                  </div>
                </div>
              </div>

              <div className="cadastro-card">
                <h2>Informações do Trajeto</h2>
                <label htmlFor="date">Data</label>
                <input
                  type="date"
                  id="date"
                  value={date ? date.split('/').reverse().join('-') : ''}
                  onChange={handleDateChange}
                  required
                />
                <label htmlFor="passeio_hora">Horário</label>
                <input
                  type="time"
                  id="passeio_hora"
                  placeholder="Horário"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  required
                />
                <label htmlFor="passeio_origem">Origem</label>
                <input
                  type="text"
                  id="passeio_origem"
                  placeholder="Origem"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  required
                />
                <label htmlFor="passeio_distancia">Distância (km)</label>
                <input
                  type="number"
                  id="passeio_distancia"
                  placeholder="Distância"
                  value={distance}
                  onChange={(event) => setDistance(event.target.value)}
                  required
                />
                <label>Horário de término estimado</label>
                <input type="time" value={end_time} readOnly />
              </div>
            </div>

            <div className="cadastro-card">
              <h3 className="price-message">Valor do passeio: <strong>{calculatedPrice}</strong></h3>
            </div>

            <button type="submit" disabled={!walkid}>Confirmar</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterWalk;