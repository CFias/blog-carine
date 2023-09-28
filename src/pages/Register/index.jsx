import { NavLink } from "react-router-dom";
import { Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

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
    setError(authError);
  }, [authError]);

  return (
    <section className="form-container container">
      <div className="form-card-container">
        <div className="form-card">
          <h1 className="form-logo-name">Carine Lima</h1>
          <h2 className="form-text">
            <span className="form-span">Mulheres em movimento</span> estão
            transformando o mundo com força e determinação.
          </h2>
          <div className="form-icons">
            <LinkedIn className="icons" />
            <Instagram path="" className="icons" />
            <YouTube path="" className="icons" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-content">
          <h2 className="form-title">Cadastre-se</h2>
          <label className="form-item">
            <input
              className="form-in"
              type="text"
              name="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              placeholder="Nome do usuário"
            />
          </label>
          <label className="form-item">
            <input
              className="form-in"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail do usuário"
            />
          </label>
          <label className="form-item">
            <input
              className="form-in"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Digite a sua senha"
            />
          </label>
          <label className="form-item">
            <input
              className="form-in"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirme a sua senha"
            />
          </label>
          {!loading && <button className="form-btn">Cadastrar</button>}
          {loading && <button className="form-btn">Aguarde</button>}
          <p className="form-route">
            Já possui cadastro ?
            <NavLink className="form-nav" to="/login">
              {" "}
              Login
            </NavLink>
          </p>
          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
