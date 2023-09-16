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
>>>>>>> d3b88bb52ed574ed48a9c2f4071fe5f918e8aeaa
  );
}
