import React from "react";
import "./styles.css";
import { AddBox, Home, Info, Person } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function BottomBar() {
  return (
    <nav className="nav-bottom-container">
      <ul className="nav-item-content">
        <li>
          <NavLink to="/" className="nav-item">
            <Home />
            <p className="nav-name">home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="" className="nav-item">
            <AddBox />
            <p className="nav-name">Adicionar</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-item">
            <Info />
            <p className="nav-name">Sobre</p>
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-item">
            <Person />
            <p className="nav-name">Perfil</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
