import { AlternateEmail, Instagram, LinkedIn, Lock, YouTube } from "@mui/icons-material";
import "../../index.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthentication } from "./../../hooks/useAuthentication";
import logo from "../../assets/image/logo.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    setError(authError);
  }, [authError]);

  return (
    <section className="form-container container">
      <div className="form-card-container">
        <div className="form-card">
        <img className="logo-nav" src={logo} alt="Carine Lima" />
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
          <h2 className="form-title">Fazer Login</h2>
          <label className="form-item">
            <AlternateEmail className="form-icons" />
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
            <Lock className="form-icons" />
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
          {!loading && <button className="form-btn">Login</button>}
          {loading && <button className="form-btn">Aguarde</button>}
          <p className="form-route">
            Não possui cadastro ?
            <NavLink className="form-nav" to="/register">
              {" "}
              Cadastre-se
            </NavLink>
          </p>
          {error && <p className="form-error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
