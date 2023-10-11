import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Edit, Share } from "@mui/icons-material";
import { posts } from "../../data.json";

export default function Home() {
  return (
    <section className="main-container container">
      <div className="main-posts-container">
        {posts.map((post) => (
          <div key={post.id} className="main-posts-content">
            <div className="main-profile">
              <div className="main-profile-content">
                <img className="main-img-profile" src={post.profile} alt="" />
                <Link to="/" className="main-name-profile">
                  Carine Lima
                </Link>
              </div>
              <div className="main-edit-icon">
                <Edit className="main-edit" />
              </div>
            </div>
            <div className="main-posts-highlight">
              <p className="main-posts-description">
                {post.desc}
                <a href="" className="main">
                  ver mais...
                </a>
              </p>
              <img className="main-posts-img" src={post.img} alt="" />
            </div>
            <div className="main-share-icon">
              <Share />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
