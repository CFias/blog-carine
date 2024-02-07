import { Avatar } from "@mui/material";
import React from "react";
import "./styles.css";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import profile from "../../assets/image/caren.png";

export default function Article() {
  return (
    <section className="article-container">
      <NavLink className="article-t" to="/articles">
        <h2>Artigos</h2>
        <ArrowForwardIosOutlined fontSize="small" className="article-icon" />
      </NavLink>
      <div className="article-content">
        <div className="article-card">
          <div className="article-info">
            <Avatar src={profile} className="article-photo" />
            <span className="article-name">Carine Lima</span>
          </div>
          <div className="article-card-content">
            <h1 className="article-title">Post</h1>
            <p className="article-txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ea
              sint, amet minus veritatis, necessitatibus odit modi repellendus
              alias debitis eius quo pariatur quam quaerat sunt molestiae
              maiores natus. Consequuntur.
            </p>
          </div>
        </div>
        <div className="article-card">
          <div className="article-info">
            <Avatar src={profile} className="article-photo" />
            <span className="article-name">Carine Lima</span>
          </div>
          <div className="article-card-content">
            <h1 className="article-title">Post</h1>
            <p className="article-txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ea
              sint, amet minus veritatis, necessitatibus odit modi repellendus
              alias debitis eius quo pariatur quam quaerat sunt molestiae
              maiores natus. Consequuntur.
            </p>
          </div>
        </div>
        <div className="article-card">
          <div className="article-info">
            <Avatar src={profile} className="article-photo" />
            <span className="article-name">Carine Lima</span>
          </div>
          <div className="article-card-content">
            <h1 className="article-title">Post</h1>
            <p className="article-txt">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia ea
              sint, amet minus veritatis, necessitatibus odit modi repellendus
              alias debitis eius quo pariatur quam quaerat sunt molestiae
              maiores natus. Consequuntur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
