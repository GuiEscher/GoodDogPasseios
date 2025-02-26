import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicione o Link aqui
import axios from 'axios';
import Header from '../../components/header';
import '../../App.css'; // Importe os estilos
import './register_walk.css'; // Importe os estilos

const RegisterWalk = (event) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [caregiver, setCaregiver] = useState('');
  const [distance, setDistance] = useState('');
  //const [price, setPrice] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [end_time, setEnd_time] = useState('');
  const [location, setLocation] = useState('');
  const [breed, setBreed] = useState('');
  const [characteristics, setCharacteristics] = useState('');

  const rating = "4.9/5";
  const description = "Especialista";
  const image = "";
  const price = "R$60,00";

  const NewWalk = {
    name: name,
    caregiver: caregiver,
    distance: distance,
    price: price,
    date: date,
    time: time,
    end_time: end_time,
    location: location,
    dog_details: {
      name: name,
      breed: breed,
      characteristics: characteristics,
    },
    walker_details: {
      name: caregiver,
      rating: rating,
      description: description,
      image: image,
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(  `http://localhost:5000/nextwalks`, NewWalk )
    navigate('/nextwalks');
  };

  return (
    <div>
      <Header />
      <section className="cadastro-section">
        <div className="cadastro-box">
          <form className="cadastro-form" onSubmit={handleSubmit}>
          <h2>Cadastrar Passeio</h2>
            <div className="cadastro-flex">
              
              <div className="cadastro-card">
                <h2>Informações do Cachorro</h2>
                <label for="name">Nome</label>
                <input type="text" id="name" placeholder="Nome do Cachorro" value={name} 
                  onChange={(event) => setName(event.target.value)} required/>
                <label for="breed">Raça</label>
                <input type="text" id="breed" placeholder="Raça do Cachorro" value={breed} 
                  onChange={(event) => setBreed(event.target.value)} required/>
                <label>Características</label>
                <div class="input-checkbox">
                  <div>
                      <input type="radio" id="opcao_amigavel" name="characteristics" value="Amigavel"
                        onChange={(event) => setCharacteristics(event.target.value)}/>
                      <label for="opcao_amigavel">Amigável</label>
                  </div>
                  <hr/>
                  <div>
                      <input type="radio" id="opcao_calmo" name="characteristics" value="Calmo"
                        onChange={(event) => setCharacteristics(event.target.value)}/>
                      <label for="opcao_calmo">Calmo</label>
                  </div>
                  <hr/>
                  <div>
                      <input type="radio" id="opcao_agitado" name="characteristics" value="Agitado"
                        onChange={(event) => setCharacteristics(event.target.value)}/>
                      <label for="opcao_agitado">Agitado</label>
                  </div>
                </div>
              </div>


              <div className="cadastro-card">
                <h2>Informações do Trajeto</h2>
                <label for="passeio_data">Data</label>
                <input type="date" id="date" placeholder="Data" value={date} 
                  onChange={(event) => setDate(event.target.value)} required/>
                <label for="passeio_hora">Horário</label>
                <input type="time" id="passeio_hora" placeholder="Horário" value={time} 
                  onChange={(event) => setTime(event.target.value)} required/>
                <label for="passeio_origem">Origem</label>
                <input type="text" id="passeio_origem" placeholder="Origem" value={location} 
                  onChange={(event) => setLocation(event.target.value)} required/>
                <label for="passeio_distancia">Distância</label>
                <input type="text" id="passeio_distancia" placeholder="Distância" value={distance} 
                  onChange={(event) => setDistance(event.target.value)} required/>
              </div>

              <div className="cadastro-card">
                <h2>Informações do Cuidador</h2>
                <label for="cuidador_nome">Nome</label>
                <input type="text" id="cuidador_nome" placeholder="Nome do Cuidador" value={caregiver} 
                  onChange={(event) => setCaregiver(event.target.value)} required/>
                <label for="cuidador_avaliacao">Avaliação</label>
                <input type="text" id="cuidador_avaliacao" value={rating} readonly="readonly"/>
                <label for="cuidador_valor">Valor Aproximado</label>
                <input type="text" id="cuidador_valor" value={price} readonly="readonly"/>
              </div>

            </div>
            <button type="submit">Confirmar</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RegisterWalk;