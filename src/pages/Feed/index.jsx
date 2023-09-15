import React from "react";
import "./styles.css";

export default function Feed() {
  return (
    <div className="card-post-container">
      <div className="card-post-content">
        <span className="card-post-category">
          Podcast
        </span>
        <img
          className="card-post-img"
          src="https://media.licdn.com/dms/image/D4D03AQFwzJ4ebw2CyA/profile-displayphoto-shrink_100_100/0/1689000908080?e=1700092800&v=beta&t=mfrLGrLmHr0hWVcXxHk1XRwt0SJBgPleHN42FFv0GC8"
          alt=""
        />
        <h1 className="card-post-title">Carine Lima</h1>
        <p className="card-post-description">
         Mulheres em Movimento
        </p>
      </div>
    </div>
  );
};
