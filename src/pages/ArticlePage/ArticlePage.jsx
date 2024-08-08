import React from "react";
import { Article } from "../../components/Article/Article";

export const ArticlePage = () => {
  return (
    <section>
      <div className="story-article"></div>
      <div className="">
        <div className="one-card"></div>
        <div className="two-cards"></div>
      </div>
      <Article />
    </section>
  );
};
