import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./styles.css";
import { db } from "../../services/FirebaseConfig";

export default function Banner({ category }) {
  const [posts, setPosts] = useState([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [category]);

  // Função para buscar os posts
  const fetchPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      let postsQuery;

      if (category) {
        const categoryQuery = where("category", "==", category);
        postsQuery = query(postsCollection, categoryQuery);
      } else {
        postsQuery = postsCollection; // Fallback para buscar todos os posts se nenhuma categoria especificada
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

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts: ", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000);

    return () => clearInterval(interval);
  }, [posts]);

  return (
    <section className="banner-container">
      {posts.length > 0 && (
        <div
          key={posts[currentPostIndex].id}
          className="banner-item"
          style={{ backgroundImage: `url(${posts[currentPostIndex].image})` }}
        >
          <div className="banner-overlay">
            <h2 className="filter-banner">{posts[currentPostIndex].filter}</h2>
            <h2 className="txt-banner">{posts[currentPostIndex].title}</h2>
            <p className="banner-p">{posts[currentPostIndex].caption}</p>
            <p className="banner-p">Por: {posts[currentPostIndex].author}</p>
            <p className="banner-date">
              {posts[currentPostIndex].publishedAt.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
