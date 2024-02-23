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
          <NavLink to="/articles" className="nav-item">
            <Collections />
            <p className="nav-name">Galeria</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/articles" className="nav-item">
            <AddCircle fontSize="large" className="nav-name-add" />
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
