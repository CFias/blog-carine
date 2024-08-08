import React, { useState, useEffect } from "react";
import "./styles.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { East, KeyboardArrowRight, West } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

export default function Banner({ featuredPosts }) {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000);

    return () => clearInterval(interval);
  }, [featuredPosts]);

  if (featuredPosts.length === 0) {
    return null;
  }

  const currentPost = featuredPosts[currentPostIndex];

  const handlePrevClick = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? featuredPosts.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === featuredPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentPostIndex(index);
  };

  return (
    <section className="banner-container">
      <div
        key={currentPost.id}
        className="banner-item"
        style={{ backgroundImage: `url(${currentPost.image})` }}
      ></div>
      <div className="banner-overlay">
        <h2 className="txt-banner">Mulheres em movimento</h2>
        <p className="cap-banner">O início de uma jornada de sucesso</p>
      </div>
      <NavLink to="/history" className="banner-link">
        Minha história <KeyboardArrowRight fontSize="small" />
      </NavLink>
      <div className="arrows-container">
        <button className="arrow-button left" onClick={handlePrevClick}>
          <West fontSize="small" />
        </button>
        <button className="arrow-button right" onClick={handleNextClick}>
          <East fontSize="small" />
        </button>
      </div>
      <div className="dots-container">
        {featuredPosts.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentPostIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </section>
  );
}
