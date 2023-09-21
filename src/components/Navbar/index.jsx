import React, { useContext } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import DarkMode from "../DarkMode";
import { Logout } from "@mui/icons-material";

export default function Navbar() {
  const { setIsLogin, setShowModal } = useContext(AppContext);
  const { user } = useAuthentication();

  const handleClick = (e) => {
    setShowModal(true);

    if (e == "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  console.log(user);

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
        {!user ? (
          <>
            <div className="nav-btn">
              <ul className="nav-content">
                <li>
                  <NavLink className="nav-profile-img">
                    <img
                      className="nav-profile"
                      src="https://media.licdn.com/dms/image/D4D03AQFwzJ4ebw2CyA/profile-displayphoto-shrink_100_100/0/1689000908080?e=1700092800&v=beta&t=mfrLGrLmHr0hWVcXxHk1XRwt0SJBgPleHN42FFv0GC8"
                      alt=""
                    />
                  </NavLink>
                </li>
                <li className="nav-btn-logout">
                  <NavLink className="nav-logout">Sair</NavLink>
                  <Logout className="nav-logout-icon" />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="nav-btn">
              <ul className="nav-content">
                <li>
                  <NavLink
                    onClick={(e) => handleClick("login")}
                    className="btn-auth-login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={(e) => handleClick("register")}
                    className="btn-auth-register"
                  >
                    Registrar
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
        <DarkMode />
      </header>
    </>
  );
}
