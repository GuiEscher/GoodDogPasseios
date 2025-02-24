import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Adicione o Link aqui
import Header from '../../components/header';
import '../../App.css'; // Importe os estilos

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação do e-mail
    if (!email.endsWith('@gmail.com')) {
      alert('O e-mail deve terminar com @gmail.com');
      return;
    }

    // Validação da senha
    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Redireciona para a próxima página (simulação)
    navigate('/nextwalks');
  };

  return (
    <div>
      <Header />
      <section className="login-section">
        <div className="login-card">
          <h2>Faça login para continuar</h2>
          <form id="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Confirmar</button>
          </form>

          <p>ou</p>
          <button className="google-login">
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