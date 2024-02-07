import React from "react";
import "./styles.css";
import { AccountCircle, AddCircle, Collections, Info, Share } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function BottomBar() {
  return (
    <nav className="nav-bottom-container">
      <ul className="nav-item-content">
        <li>
          <NavLink to="/" className="nav-item">
            <Share />
            <p className="nav-name">Redes</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/gallery" className="nav-item">
            <Collections />
            <p className="nav-name">Galeria</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/addpost" className="nav-item">
            <AddCircle />
            <p className="nav-name">Adicionar</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="nav-item">
            <Info />
            <p className="nav-name">Acerca</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="nav-item">
            <AccountCircle />
            <p className="nav-name">Perfil</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
