import React, { useEffect, useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import {
  DateRange,
  FilterListRounded,
  Person2Rounded,
} from "@mui/icons-material";
import { Avatar, Modal, Backdrop, Fade, Button } from "@mui/material";

export default function ArticlePosts({ category }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [category]);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      let postsQuery;

      if (category) {
        const categoryQuery = where("category", "==", category);
        postsQuery = query(postsCollection, categoryQuery);
      } else {
        postsQuery = postsCollection;
      }

      const snapshot = await getDocs(postsQuery);
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt.toDate(),
        };
      });

      let filteredPosts = fetchedPosts;

      if (category === "publicação com foto") {
        filteredPosts = fetchedPosts.filter((post) => post.image);
      }

      const sortedPosts = filteredPosts.sort(
        (a, b) => b.publishedAt - a.publishedAt
      );

      const limitedPosts = sortedPosts.slice(0, 12);
      setPosts(limitedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts: ", error);
    }
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <section className="article-container">
      <div className="article-content">
        {posts.map((post) => (
          <div className="art-card" key={post.id}>
            <div className="art-wrapper" onClick={() => handleOpenModal(post)}>
              {post.image && (
                <img src={post.image} alt="Publicação" className="art-image" />
              )}
              <div className="art-type">
                <span className="art-icon">
                  <FilterListRounded className="icon-art" fontSize="small" />
                </span>
                {post.filter}
              </div>
            </div>
            <div className="art-desc">
              <p className="post-date-rec">
                Publicado <span>•</span> {post.publishedAt.toLocaleString()}
                <DateRange fontSize="10" />
              </p>
              <p className="art-caption-title">{post.title}</p>
              <p className="art-caption">{post.caption}</p>
              <div className="infos-user-cap">
                <span className="icon-banner">
                  <Person2Rounded fontSize="small" className="icon-side" />
                </span>{" "}
                <p className="art-author">{post.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        className="modal-card-container"
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade className="modal-card-content" in={openModal}>
          <div className="modal-paper">
            {selectedPost && (
              <>
                <img
                  src={selectedPost.image}
                  alt="Publicação"
                  className="modal-image"
                />
                <div className="modal-content-art">
                  <div className="desc-modal-1">
                    <h2 className="title-modal" id="modal-title">
                      {selectedPost.title}
                    </h2>
                    <p className="caption-modal" id="modal-description">
                      {selectedPost.caption}
                    </p>
                  </div>
                  <div className="desc-modal-2">
                    <p>{selectedPost.author}</p>
                    <p>
                      Publicado em: {selectedPost.publishedAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </section>
  );
}
