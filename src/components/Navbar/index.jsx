import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <header className="header-container">
        <h1 className="logo-name">Carine Lima</h1>
        <nav className="nav-container">
          <ul className="nav-content">
            <li>
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/info" className="nav-item">
                História
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-item">
                Contato
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
