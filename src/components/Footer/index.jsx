import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/image/logo.png"

export default function Footer() {
  return (
    <footer className="footer-container">
      <nav className="footer-nav">
        <ul className="footer-content">
          <li>
            <NavLink to="/" className="footer-item">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="footer-item">
              Contato
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="footer-item">
              Sobre
            </NavLink>
          </li>
        </ul>
        <img className="logo-nav" src={logo} alt="" />
        <p className="footer-copy">
          Carine Lima &copy; 2023 | All rights reserved. | Developed by Fias
        </p>
      </nav>
    </footer>
  );
}
