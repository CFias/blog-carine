import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { Edit, Share } from "@mui/icons-material";

export default function Home() {
  return (
    <div className="main-container container">
      <div className="main-posts-content">
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
        <div className="main-posts-highlight">
          <p className="main-posts-description">
            Vem aí mais um evento voltado para o meio ambiente, governação e
            <span className="main"> ver mais...</span>
          </p>
          <img
            className="main-posts-img"
            src="https://media.licdn.com/dms/image/sync/D5627AQH87GOX7nASlg/articleshare-shrink_1280_800/0/1694561551064?e=1695783600&v=beta&t=2BIH2ArPAdG5lyt6J0zWR6rDhtuFsrzPYF-YgqnS4Kw"
            alt=""
          />
        </div>
        <div className="main-share-icon">
          <Share />
        </div>
      </div>
    </div>
  );
};