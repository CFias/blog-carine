import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Edit, Share } from "@mui/icons-material";

export default function Home() {
  return (
    <div className="main-container">
      <div className="main-content">
        <div className="main-posts-container">
          <div className="main-profile">
            <img
              className="main-img-profile"
              src="https://media.licdn.com/dms/image/D4D03AQFwzJ4ebw2CyA/profile-displayphoto-shrink_100_100/0/1689000908080?e=1700092800&v=beta&t=mfrLGrLmHr0hWVcXxHk1XRwt0SJBgPleHN42FFv0GC8"
              alt=""
            />
            <NavLink to="/" className="main-name-profile">
              Carine Lima
            </NavLink>
            <div className="main-edit-icon">
              <Edit className="main-edit" />
            </div>
          </div>
          <h1 className="main-posts-title">Primeiro Post <span className="main-span" >podcast</span></h1>
          <p className="main-posts-description">
            Vem aí mais um evento voltado para o meio ambiente, governação e
          </p>
          <div className="main-posts-highlight">
            <img
              className="main-posts-img"
              src="https://media.licdn.com/dms/image/D4D22AQF7XyblRcVBkg/feedshare-shrink_800/0/1694648304678?e=1697673600&v=beta&t=343f3T_39MEtKTlz9SQ3lVsxMBQhHB0hRQlG_8-LDe8"
              alt=""
            />
          </div>
          <div className="main-share-icon">
            <Share />
          </div>
        </div>
      </div>
    </div>
  );
}
