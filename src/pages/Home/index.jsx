import React from "react";
import "./styles.css";
import ArticlePosts from "../../components/ArticlePosts/ArticlePosts";
import Banner from "../../components/Banner/index";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
      <section className="main-container">
        <section className="banner-section">
          <Banner />
        </section>
        <section className="articles-home">
          <h4 className="article-h4">Blog</h4>
          <p></p>
          <ArticlePosts category="publication" />
        </section>
      </section>
    </>
  );
}
