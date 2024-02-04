import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Edit, Share } from "@mui/icons-material";
import { posts } from "../../data.json";
import Banner from "../../components/Banner";

export default function Home() {
  return (
    <section className="main-container container">
      <Banner />
    </section>
  );
}
