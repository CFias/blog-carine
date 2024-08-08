import React, { useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useAuthValue } from "./../../contexts/AuthContext";
import SideMenu from "../SideMenu/SideMenu";
import NotificationsMenu from "../NotificationsMenu/NotificationsMenu"; // Importa o novo componente
import { Menu, Notifications } from "@mui/icons-material";
import logo from "../../assets/image/logo.png";
import { useAuthentication } from "../../hooks/useAuthentication";
import { adminUIDs } from "../../Config/Config";

export default function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const [isOpen, setIsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Fake notifications for demonstration
  const notifications = [
    "Nova publicação disponível!",
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const isAdmin = user && adminUIDs.includes(user.uid);

  return (
    <>
      <header className="header-container">
        <nav className="nav-container">
          <NavLink to="/" className="logo-name">
            <img className="logo-nav" src={logo} alt="Carine Lima" />
          </NavLink>
          <ul className="nav-content">
            <li>
              <NavLink to="/article" className="nav-item">
                Artigos
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
          {user ? (
            <div className="nav-btn">
              <ul className="nav-content">
                <h4>Olá, {user.displayName}</h4>
                {isAdmin && (
                  <li className="nav-btn-settings">
                    <NavLink to="/adm" className="nav-item-adm">
                      ADM
                    </NavLink>
                  </li>
                )}
                <li className="nav-btn-settings">
                  <NavLink
                    to="/profile"
                    onClick={logout}
                    className="nav-settings"
                  >
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
        </nav>
      </header>
      <nav className="nav-mob">
        <div className="nav-mob-content">
          <div className="menu-cx">
            <Menu className="mob-icon" fontSize="medium" onClick={toggleMenu} />
          </div>
          <div className="nav-mob-icon">
            <img className="logo-nav" src={logo} alt="Carine Lima" />
          </div>
          <div className="nav-mob-notifications" onClick={toggleNotifications}>
            <Notifications className="mob-icon" fontSize="medium" />
            <NotificationsMenu
              isOpen={isNotificationsOpen}
              onClose={toggleNotifications}
              notifications={notifications}
            />
          </div>
        </div>
        <SideMenu isOpen={isOpen} onClose={toggleMenu} />
      </nav>
    </>
  );
}
