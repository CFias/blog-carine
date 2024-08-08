import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import "./styles.css";

const backgroundClasses = [
  "art-bg-1",
  "art-bg-2",
  "art-bg-3",
  "art-bg-4",
  "art-bg-5",
];

const getRandomBgClass = () => {
  const randomIndex = Math.floor(Math.random() * backgroundClasses.length);
  return backgroundClasses[randomIndex];
};

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
        postsQuery = postsCollection;
      }

      const snapshot = await getDocs(postsQuery);
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt.toDate(),
          bgClass: getRandomBgClass(), // Assign random background class
        };
      });

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
    <div className="article-container">
      {artPost.length > 0 && (
        <div className="art-main-card">
          <div className={`art-main-card-content ${artPost[0].bgClass}`}>
            <h2 className="art-caption-title">{artPost[0].title}</h2>
            <p className="art-caption">{artPost[0].caption}</p>
            <p className="art-author">{artPost[0].author}</p>
            <p className="post-date-rec">
              {artPost[0].publishedAt.toLocaleString()}
            </p>
          </div>
        </div>
      )}
      <div className="art-small-cards">
        {artPost.slice(1).map((post) => (
          <div key={post.id} className={`art-small-card ${post.bgClass}`}>
            <div className="art-content-small">
              <h3 className="art-caption-title">{post.title}</h3>
              <p className="art-caption">{post.caption}</p>
              <p className="art-author">{post.author}</p>
              <p className="post-date-rec">
                {post.publishedAt.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
