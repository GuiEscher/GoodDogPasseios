import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase'; 
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Header from '../../components/header';
import '../../App.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (phone.length < 11) {
      alert('O telefone deve ter pelo menos 11 dígitos');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/nextwalks');
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/nextwalks');
    } catch (error) {
      alert('Erro ao autenticar com Google: ' + error.message);
    }
  };

  return (
    <div>
      <Header />
      <section className="login-section">
        <div className="login-card">
          <h2>Cadastre sua conta</h2>
          <form id="register-form" onSubmit={handleRegister}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="passwordconf">Confirme sua senha</label>
            <input type="password" id="passwordconf" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

            <label htmlFor="telefone">Telefone</label>
            <input type="text" id="telefone" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} required />

            <button type="submit">Confirmar</button>
          </form>

          <p>ou</p>
          <button className="google-login" onClick={handleGoogleRegister}>
            <img src="/assets/google-icon.png" alt="Google Icon" /> Google
          </button>

          <Link to="/login" className="register_link">Já tem uma conta? Faça login</Link>
        </div>

        <div className="login-image">
          <img src="/assets/login-image.png" alt="Ilustração de cachorro com pessoa" />
        </div>
      </section>
    </div>
  );
};

export default Register;
