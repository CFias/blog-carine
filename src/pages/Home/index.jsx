import React from "react";
import "./styles.css";
import Banner from "../../components/Banner";
import Articles from "../../components/Article";

export default function Home() {
  return (
    <section className="main-container container">
      <Banner />
      <Articles />
    </section>
  );
}
