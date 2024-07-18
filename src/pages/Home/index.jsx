import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import ArticlePosts from "../../components/ArticlePosts/ArticlePosts";
import { Article } from "../../components/Article/Article";

export default function Home() {
  return (
    <section className="main-container">
      <section className="articles-home">
        <h4 className="article-h4">Blog</h4>
        <ArticlePosts category="publication" />
      </section>
      <Article />
    </section>
  );
}
