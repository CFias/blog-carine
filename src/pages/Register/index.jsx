import React, { useEffect, useState } from "react";
import "./styles.css";
import { useAuthentication } from "./../../hooks/useAuthentication";

export default function Register() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  console.log(error)

  return (
    <section className="form-container">
      <h1 className="form-logo-name">Carine Lima</h1>
      <h2 className="form-title">Cadastre-se</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <label className="form-item">
          Nome
          <input
            className="form-in"
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label className="form-item" >
          E-mail
          <input
            className="form-in"
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-item" >
          <span>Senha</span>
          <input
            className="form-in"
            type="password"
            name="password"
            required
            placeholder="Digite a sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="form-item">
          <span>Cornfirmar senha</span>
          <input
            className="form-in"
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="form-btn">Cadastrar</button>}
        {loading && <button className="form-btn" disabled >Aguarde</button>}
        {error && <p className="error" >{error}</p>}
      </form>
    </section>
  );
}
