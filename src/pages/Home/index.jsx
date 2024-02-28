import React from "react";
import "./styles.css";
import Banner from "../../components/Banner";
import Article from "../../components/Article";
import Redes from "../../components/Redes"

export default function Home() {
  return (
    <section className="main-container">
      <div className="bg-container">
        <Banner />
      </div>
        <Article />
        <Redes />
    </section>
  );
}
