import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

export default function Banner() {
  return (
    <>
      <section className="banner-container">
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
