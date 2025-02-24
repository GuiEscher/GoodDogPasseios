import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import '../../App.css'; // Importe os estilos

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
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

    // Validação de confirmação de senha
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    // Validação do telefone
    if (phone.length < 11) {
      alert('O telefone deve ter pelo menos 11 dígitos');
      return;
    }

    // Redireciona para a próxima página (simulação)
    navigate('/dashboard');
  };

  return (
    <div>
      <Header />
      <section className="login-section">
        <div className="login-card">
          <h2>Cadastre sua conta</h2>
          <form id="register-form" onSubmit={handleSubmit}>
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

            <label htmlFor="passwordconf">Confirme sua senha</label>
            <input
              type="password"
              id="passwordconf"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button type="submit">Confirmar</button>
          </form>

          <p>ou</p>
          <button className="google-login">
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