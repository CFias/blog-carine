<<<<<<< HEAD
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import React from "react";
import "./styles.css";

export default function Navbar() {
  return (
    <div className="header-container">
      <nav className="nav-logo">
          <h1 className="logo">Carine Lima</h1>
      </nav>
      <nav className="nav-items">
         <NavLink className="items" to="/" >Home</NavLink>
         <NavLink className="items" to="/info" >História</NavLink>
         <NavLink className="items" to="/contacts" >Contatos</NavLink>
      </nav>
    </div>
=======
import React from "react";
=======
import React, { useContext } from "react";
>>>>>>> 40f1210296fd5f39fff3b7d0b25a4435c641cab0
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
>>>>>>> d3b88bb52ed574ed48a9c2f4071fe5f918e8aeaa
  );
};
