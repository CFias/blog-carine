import React, { useEffect, useState } from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import { ArrowForward } from "@mui/icons-material";

export default function Article({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

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
      
      <div className="article-content">
        {posts.map((post) => (
          <NavLink to="/articles" className="art-card" key={post.id}>
            {post.image && (
              <img src={post.image} alt="Publicação" className="art-image" />
            )}
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
