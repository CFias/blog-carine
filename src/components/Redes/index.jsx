import { Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import React from "react";
import "./styles.css";

export default function Redes() {
  return (
    <div className="redes-container">
      <div className="rede">
        <LinkedIn className="rede-icon" />
        <p>Conecte-se no <b>LinkedIn</b></p>
      </div>
      <div className="rede">
        <Instagram className="rede-icon" />
        <p>Siga-me no <b>instagram</b> </p>
      </div>
      <div className="rede">
        <YouTube className="rede-icon" />
        <p>Inscreva-se no <b>YouTube</b></p>
      </div>
    </div>
  );
}
