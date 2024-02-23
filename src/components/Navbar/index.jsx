import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "./../../hooks/useAuthentication";
import { useAuthValue } from "./../../contexts/AuthContext";
import { Avatar } from "@mui/material";
import profile from "../../assets/image/caren.png";
import { Logout } from "@mui/icons-material";

export default function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <header className="header-container">
        <NavLink to="/" className="logo-name">
          <h4 className="logo-name">Carine Lima</h4>
        </NavLink>
        <NavLink to="/" className="logo-name-mob">
          <h4 className="logo-name-mob">Carine Lima</h4>
        </NavLink>
        <nav className="nav-container">
          <ul className="nav-content">
            <li>
              <NavLink to="/articles" className="nav-item">
                Artigos
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className="nav-item">
                Galeria
              </NavLink>
            </li>
            <li>
              <NavLink to="/podcasts" className="nav-item">
                Podcasts
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-item">
                Redes
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="nav-item">
                Acerca
              </NavLink>
            </li>
          </ul>
        </nav>
        {user ? (
          <div className="nav-btn">
            <ul className="nav-content">
              {/* <li>
                <NavLink to="/createpost" className="nav-item">
                  Novo Post
                </NavLink>
              </li> */}
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
                <span className="nav-logout-name">Olá, {user.displayName}</span>
                <NavLink onClick={logout} className="nav-logout">
                  Sair
                </NavLink>
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
                  Cadastre-se
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
