import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import DarkMode from "../DarkMode";
import { Logout } from "@mui/icons-material";
import { useAuthentication } from "./../../hooks/useAuthentication";
import { useAuthValue } from "./../../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

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
        {user ? (
          <div className="nav-btn">
            <ul className="nav-content">
              <li>
                <NavLink to="/createpost" className="nav-item">
                  Novo Post
                </NavLink>
              </li>
              <li>
                <NavLink className="nav-profile-img">
                  <img
                    className="nav-profile"
                    src="https://media.licdn.com/dms/image/D4D03AQF9HZmFqoBrZg/profile-displayphoto-shrink_100_100/0/1695645600115?e=1701302400&v=beta&t=H6sc1ovst8Cw4si4r5ZkTFvyakg8HfdxNAuxzZ0_u9A"
                    alt=""
                  />
                </NavLink>
              </li>
              <li className="nav-btn-logout">
                <NavLink onClick={logout} className="nav-logout">
                  Sair
                </NavLink>
                <Logout className="nav-logout-icon" />
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav-btn">
            <ul className="nav-content">
              <li>
                <NavLink to="/login" className="btn-auth-login">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="btn-auth-register">
                  Registrar
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <DarkMode />
      </header>
    </>
  );
}
