import React, { useEffect, useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import { ArrowForward, KeyboardArrowRight } from "@mui/icons-material";

export default function Article() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const snapshot = await getDocs(postsCollection);
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt.toDate(),
        };
      });
      const sortedPosts = fetchedPosts.sort(
        (a, b) => b.publishedAt - a.publishedAt
      ); 
      const limitedPosts = sortedPosts.slice(0, 12);

      setPosts(limitedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts: ", error);
    }
  };

  return (
    <section className="article-container">
      <div className="article-tags-container">
        <h4 className="posts-recent">Publicações recentes</h4>
        <span className="tags-line"></span>
        <NavLink to="/articles" className="tags">
          Mais publicações
          <ArrowForward fontSize="small" className="tags-icon" />
        </NavLink>
      </div>
      <div className="article-content">
        {posts.map((post) => (
          <NavLink
            to="/articles"
            className="art-card"
            key={post.id}
            onClick={() => openModal(post)}
          >
            <img src={post.image} alt="Publicação" className="art-image" />
            <div className="art-desc">
              <p className="post-date-rec">
                {post.publishedAt.toLocaleString()}
              </p>
              <p className="art-caption">{post.caption}</p>
            </div>
          </NavLink>
        ))}
        <NavLink to="/articles" className="tags-mob">
          Mais publicações
          <ArrowForward fontSize="small" className="tags-icon" />
        </NavLink>
      </div>
    </section>
  );
}
