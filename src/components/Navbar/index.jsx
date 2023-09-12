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
  );
}
