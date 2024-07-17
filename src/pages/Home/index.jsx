import React from "react";
import "./styles.css";
import Article from "../../components/ArticlePosts/ArticlePosts";
import Redes from "../../components/Redes";
import { NavLink } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";

export default function Home() {
  return (
    <section className="main-container">
      <section className="articles-home">
        <div className="article-tags-container">
          <h4 className="posts-recent-home">Publicações recentes</h4>
          <span className="tags-line"></span>
          <NavLink to="/articles" className="tags">
            Mais publicações
            <ArrowForward fontSize="small" className="tags-icon" />
          </NavLink>
        </div>
        <Article category="publication" />
      </section>
      <Redes />
    </section>
  );
}
