import React, { useContext } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

export default function Navbar() {
  const { setIsLogin, setShowModal } = useContext(AppContext);

  const handleClick = (e) => {
    setShowModal(true);

    if (e == "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  return (
    <>
      <header className="header-container">
        <NavLink to="/" className="logo-name">
          Carine Lima
        </NavLink>
        <nav className="nav-container">
          <ul className="nav-content">
            <li>
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-item">
                Contato
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-item">
                Sobre
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="nav-btn">
          <li>
            <NavLink
              onClick={(e) => handleClick("login")}
              className="btn-auth-login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={(e) => handleClick("register")}
              className="btn-auth-register"
            >
              Registrar
            </NavLink>
          </li>
        </div>
      </header>
    </>
  );
};
