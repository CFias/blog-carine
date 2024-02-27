// Article.js
import React, { useEffect, useState } from "react";
import "./styles.css";
import { ArrowForwardIosOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { PostCard } from "../PostCard/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";

export default function Article() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const postsCollection = collection(db, "posts");
    const snapshot = await getDocs(postsCollection);
    const fetchedPosts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(fetchedPosts);
  };

  return (
    <section className="article-container">
      <NavLink className="article-t" to="/articles">
        <h2>Artigos</h2>
        <ArrowForwardIosOutlined fontSize="small" className="article-icon" />
      </NavLink>
      <div className="article-content">
          {posts.map((post) => (
            <NavLink
              to="/articles"
              className="art-card"
              key={post.id}
              onClick={() => openModal(post)}
            >
              <div className="art-desc">
                <p className="art-caption">{post.caption}</p>
              </div>
              <img src={post.image} alt="Publicação" className="art-image" />
            </NavLink>
          ))}
      </div>
    </section>
  );
}
