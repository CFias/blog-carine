import React from "react";
import "./styles.css";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../contexts/AuthContext";
import { Avatar } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <>
      <div className="profile-container container">
        {user ? (
          <div className="profile-content">
            <Avatar />
            <h2 className="profile-item">{user.displayName}</h2>
            <h3 className="profile-item">{user.email}</h3>
            <NavLink className="profile-item" onClick={logout}>
              Sair
            </NavLink>
          </div>
        ) : (
          <div className="profile-content">
            <NavLink className="profile-item" to="/login">
              Entrar
            </NavLink>
            <NavLink className="profile-item" to="/register">
              Cadastre-se
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}
