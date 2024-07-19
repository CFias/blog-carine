import React, { useEffect, useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import { DateRange, Favorite, FilterListRounded } from "@mui/icons-material";

export default function ArticlePosts({ category }) {
  const [posts, setPosts] = useState([]);

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
        postsQuery = postsCollection; // Fallback to fetch all posts if no category specified
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

  return (
    <section className="article-container">
      <div className="article-content">
        {posts.map((post) => (
          <NavLink to="/" className="art-card" key={post.id}>
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
              <p className="post-date-rec">
                Publicado <span>•</span>
                {post.publishedAt.toLocaleString()}
                <DateRange fontSize="10" />
              </p>
              <p className="art-caption-title">{post.title}</p>
              <p className="art-caption">{post.caption}</p>
              <p className="art-author">{post.author}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
