import React, { useEffect, useState, useRef } from "react";
import "./styles.css";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import {
  DateRange,
  FilterListRounded,
  WhatsApp,
  Instagram,
  Share, // Import the Share icon
} from "@mui/icons-material";
import { Modal, Backdrop, Fade, Button } from "@mui/material";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; // Correct locale import
import profile from "../../assets/image/caren.png";

export default function ArticlePosts({ category, filter }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(8);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    fetchPosts();
  }, [category, filter]);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      let postsQuery;

      if (category && category !== "Filtrar por:") {
        postsQuery = query(postsCollection, where("category", "==", category));
      } else {
        postsQuery = postsCollection;
      }

      if (filter && filter !== "Filtrar por:") {
        postsQuery = query(postsQuery, where("filter", "==", filter));
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

      setAllPosts(sortedPosts);
      setPosts(sortedPosts.slice(0, visiblePosts));
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

  const loadMorePosts = () => {
    setVisiblePosts((prevVisiblePosts) => {
      const newVisiblePosts = prevVisiblePosts + 8;
      setPosts(allPosts.slice(0, newVisiblePosts));
      return newVisiblePosts;
    });
  };

  const shareOnWhatsApp = (post) => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      post.title
    )}%20${encodeURIComponent(post.caption)}%20${encodeURIComponent(
      "https://blog-carine.vercel.app/"
    )}`;
    window.open(url, "_blank");
  };

  const shareOnInstagram = () => {
    const url = `https://www.instagram.com`;
    window.open(url, "_blank");
  };

  return (
    <section className="article-container">
      <div className="article-content">
        {posts.map((post) => (
          <div
            className="art-card"
            key={post.id}
            onClick={() => handleOpenModal(post)}
          >
            <div className="art-wrapper">
              {post.image && (
                <img src={post.image} alt="Publicação" className="art-image" />
              )}
              <div className="art-type">
                <span className="art-icon">
                  <FilterListRounded className="icon-art" fontSize="10" />
                </span>
                {post.filter}
              </div>
            </div>
            <div className="art-desc">
              <p className="art-caption-title">{post.title}</p>
              <p className="art-caption">{post.caption}</p>
              <div className="infos-user-cap">
                <div className="author-photo">
                  <span className="icon-profile">
                    <img className="art-profile" src={profile} alt="" />
                  </span>{" "}
                  <p className="art-author">{post.author}</p>
                </div>
                <div className="post-date-rec">
                  <p>
                    <span>•</span>{" "}
                    {format(post.publishedAt, "MMM yyyy", { locale: ptBR })}{" "}
                    <DateRange fontSize="10" />
                  </p>
                  <Button
                    onClick={() => shareOnWhatsApp(post)}
                  >
                    <Share fontSize="10" className="share-btn" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visiblePosts < allPosts.length && (
        <Button onClick={loadMorePosts} className="load-more-btn">
          Ver mais
        </Button>
      )}
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
          <div className="modal-paper" ref={modalContentRef}>
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
                    <p className="modal-date">
                      Publicado em:{" "}
                      {format(selectedPost.publishedAt, "MMM yyyy", {
                        locale: ptBR,
                      })}{" "}
                    </p>
                  </div>
                  <div className="share-buttons">
                    <Button
                      onClick={() => shareOnWhatsApp(selectedPost)}
                      className="share-btn"
                      variant="contained"
                      color="success"
                      startIcon={<WhatsApp />}
                    >
                      Compartilhar no WhatsApp
                    </Button>
                    <Button
                      onClick={shareOnInstagram}
                      className="share-btn"
                      variant="contained"
                      color="primary"
                      startIcon={<Instagram />}
                    >
                      Compartilhar no Instagram
                    </Button>
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
