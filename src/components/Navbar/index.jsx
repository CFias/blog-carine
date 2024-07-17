import React, { useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "./../../hooks/useAuthentication";
import { useAuthValue } from "./../../contexts/AuthContext";
import SideMenu from "../SideMenu/SideMenu";
import { Menu } from "@mui/icons-material";

export default function Navbar() {
  const { user } = useAuthValue();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header-container">
        <nav className="nav-container">
          <NavLink to="/" className="logo-name">
            <h4 className="logo-name">Carine Lima</h4>
          </NavLink>
          <ul className="nav-content">
            <li>
              <NavLink to="/" className="nav-item">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/articles" className="nav-item">
                Artigos
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
              <li>
                <NavLink className="nav-profile-img">
                  <img
                    className="nav-profile"
                    src="https://media.licdn.com/dms/image/D4D03AQF9HZmFqoBrZg/profile-displayphoto-shrink_100_100/0/1695645600115?e=1701302400&v=beta&t=H6sc1ovst8Cw4si4r5ZkTFvyakg8HfdxNAuxzZ0_u9A"
                    alt=""
                  />
                </NavLink>
              </li>
              <li className="nav-btn-settings">
                <NavLink to="/adm" className="nav-item">
                  ADM
                </NavLink>
                <NavLink to="/profile" className="nav-settings">
                  {/* <Avatar className="nav-photo" /> */}
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
        <nav className="nav-mob">
          <div className="nav-mob-content">
            <div className="nav-mob-icon" onClick={toggleMenu}>
              <Menu className="mob-icon" fontSize="medium" />
              {/* <h4>{user.userName}</h4> */}
            </div>
            <SideMenu isOpen={isOpen} onClose={toggleMenu} />
          </div>
        </nav>
      </header>
    </>
  );
}
