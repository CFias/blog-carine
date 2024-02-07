import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { useAuthValue } from "../../contexts/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";

export default function Banner() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <section className="banner-container">
        <div className="mob-card">
          {user ? (
            <div className="user-log">
              <span>Olá, {user.displayName}</span>
              <NavLink className="log-user" onClick={logout}>
                Sair
              </NavLink>
            </div>
          ) : (
            <div className="no-user">
              <NavLink
                to="/login
              "
                className="user-no"
              >
                Login
              </NavLink>
            </div>
          )}
        </div>
        <div className="banner-txt">
          <h2 className="txt-banner">MULHERES EM MOVIMENTO</h2>
          <p className="banner-p">
            Mulheres virtuosas se movimentam, conquistam seu espaço com
            dignidade e não negociam os seus valores.
          </p>
          <div className="banner-btns">
            <NavLink to="/contact" className="banner-btn btn">
              Redes
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
