import React from "react";
import "./styles.css";
import { AccountCircle, AddCircle, Collections, Home, Info, Share } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function BottomBar() {
  return (
    <nav className="nav-bottom-container">
      <ul className="nav-item-content">
        <li>
          <NavLink to="/" className="nav-item">
            <Home />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="nav-item">
            <Share />
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
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="nav-item">
            <AccountCircle />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
