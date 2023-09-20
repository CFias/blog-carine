import React from "react";
import "./styles.css";
import { Edit } from "@mui/icons-material";

export default function About() {
  return (
    <div className="about-container container">
      <div className="about-content">
        <div className="about-name-img">
          <img
            className="about-img"
            src="https://media.licdn.com/dms/image/D4D03AQFwzJ4ebw2CyA/profile-displayphoto-shrink_100_100/0/1689000908080?e=1700092800&v=beta&t=mfrLGrLmHr0hWVcXxHk1XRwt0SJBgPleHN42FFv0GC8"
            alt=""
          />
          <p className="about-name-logo">Carine Lima</p>
          <Edit className="about-edit" />
        </div>
        <div className="about-history">
          <h1 className="about-title">Mulheres em Movimento</h1>
          <p className="about-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
            quis consequuntur nisi asperiores? Facere blanditiis vero quis
            recusandae expedita illum ipsam voluptatem quidem ipsum distinctio!
            Distinctio ut officiis amet error!
          </p>
        </div>
      </div>
    </div>
  );
};