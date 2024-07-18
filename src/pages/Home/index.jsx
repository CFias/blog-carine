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
        <ArticlePosts category="publication" />
        <Article />
      </section>
    </section>
  );
}
