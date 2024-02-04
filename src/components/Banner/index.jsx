import React from "react";
import "./styles.css";
import Articles from "../Article";

export default function Banner() {
  return (
    <section className="banner-container">
      <div className="banner-txt">
        <h2 className="txt-banner">MULHEREM EM MOVIMENTO</h2>
        <p className="banner-p">
          Mulheres virtuosas se movimentam, conquistam seu espaço com
          dignidade e não negociam os seus valores.
        </p>
        <div className="banner-btns">
          <button className="banner-btn-contact btn">Contato</button>
          <button className="banner-btn-social btn">Redes</button>
        </div>
      </div>
        <Articles />
    </section>
  );
}
