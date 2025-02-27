import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../config/firebase'; 
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Header from '../../components/header';
import '../../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/nextwalks');
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
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
          <h2>Faça login para continuar</h2>
          <form id="login-form" onSubmit={handleLogin}>
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="password">Senha</label>
            <input type="password" id="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit">Confirmar</button>
          </form>

          <p>ou</p>
          <button className="google-login" onClick={handleGoogleLogin}>
            <img src="/assets/google-icon.png" alt="Google Icon" /> Google
          </button>

          <Link to="/register" className="register_link">Cadastre-se</Link>
        </div>

        <div className="login-image">
          <img src="/assets/login-image.png" alt="Ilustração de cachorro com pessoa" />
        </div>
      </section>
    </div>
  );
};

export default Login;
