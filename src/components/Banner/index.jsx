import React, { useState, useEffect } from "react";
import "./styles.css";
import { Person2Rounded } from "@mui/icons-material";

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
    return null; // Se não houver posts em destaque, não renderiza nada
  }

  const currentPost = featuredPosts[currentPostIndex];

  return (
    <section className="banner-container">
      <div
        key={currentPost.id}
        className="banner-item"
        style={{ backgroundImage: `url(${currentPost.image})` }}
      >
        <div className="banner-overlay">
          <h4 className="dest-banner">Destaques</h4>
          <div className="tags">
            <p className="banner-p">
              <span className="icon-banner">
                <Person2Rounded />
              </span>{" "}
              {currentPost.author} <span>•</span>{" "}
              <span>{currentPost.filter}</span>
            </p>
          </div>
          <h2 className="txt-banner">{currentPost.title}</h2>
        </div>
      </div>
    </section>
  );
}
