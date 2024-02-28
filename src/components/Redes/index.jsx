import {
  Instagram,
  KeyboardArrowRight,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

export default function Redes() {
  return (
    <div className="redes-container">

      <div className="redes-content">
        <NavLink className="rede">
          <LinkedIn className="rede-icon" />
          <p>LinkedIn</p>
          <KeyboardArrowRight fontSize="small" />
        </NavLink>
        <NavLink className="rede">
          <Instagram className="rede-icon" />
          <p>instagram</p>
          <KeyboardArrowRight fontSize="small" />
        </NavLink>
        <NavLink className="rede">
          <YouTube className="rede-icon" />
          <p>YouTube</p>
          <KeyboardArrowRight fontSize="small" />
        </NavLink>
      </div>
    </div>
  );
}
