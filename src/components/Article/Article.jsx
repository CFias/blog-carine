import { collection, getDocs, where, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../../services/FirebaseConfig";
import "./styles.css";

export const Article = ({ category }) => {
  const [artPost, setArtPost] = useState([]);

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

      // Filtra os posts para excluir aqueles que têm uma imagem
      const filteredPosts = fetchedPosts.filter((post) => !post.image);

      const sortedPosts = filteredPosts.sort(
        (a, b) => b.publishedAt - a.publishedAt
      );

      const limitedPosts = sortedPosts.slice(0, 12);
      setArtPost(limitedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts: ", error);
    }
  };

  return (
    <div className="article-card">
      {artPost.map((articlePost) => (
        <div to="/" className="card-article" key={articlePost.id}>
          <div className="article-desc">
            <p className="article-caption">{articlePost.caption}</p>
            <p className="post-date-rec-art">
              {articlePost.publishedAt.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
