import React, { useState } from "react";
import "./styles.css";
import { Modal } from "@mui/material";

const Story = ({ posts }) => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Limit to 6 posts
  const visiblePosts = posts.slice(0, 10);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < visiblePosts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleClose();
    }
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="story-container">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post, index) => (
            <div
              key={post.id}
              className="story-card"
              onClick={() => handleOpen(index)}
            >
              <img src={post.image} alt={post.title} className="img-story" />
            </div>
          ))
        ) : (
          <p>No stories available</p>
        )}

        <Modal open={open} onClose={handleClose}>
          <div className="modal-content">
            <div className="modal-main">
              <img
                src={visiblePosts[currentIndex]?.image}
                alt={visiblePosts[currentIndex]?.title}
                className="modal-img"
              />
              <div className="modal-story-content">
                <h3>{visiblePosts[currentIndex]?.title}</h3>
                <p>{visiblePosts[currentIndex]?.content}</p>
              </div>
            </div>
            <div className="modal-thumbnails">
              {visiblePosts.map((post, index) => (
                <img
                  key={post.id}
                  src={post.image}
                  alt={post.title}
                  className={`thumbnail ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Story;
