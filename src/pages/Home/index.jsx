import React, { useEffect, useState } from "react";
import "./styles.css";
import ArticlePosts from "../../components/ArticlePosts/ArticlePosts";
import Banner from "../../components/Banner/index";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FilterListRounded } from "@mui/icons-material";
import { db } from "../../services/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Article } from "../../components/Article/Article";

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const snapshot = await getDocs(postsCollection);
      const fetchedPosts = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((post) => post.isFeatured);

      setFeaturedPosts(fetchedPosts);
    } catch (error) {
      console.error("Erro ao buscar posts em destaque:", error.message);
      // Aqui você pode tratar o erro de alguma forma adequada para sua aplicação
    }
  };

  return (
    <>
      <Navbar />
      <section className="main-container">
        <section className="banner-section">
          <Banner featuredPosts={featuredPosts} />
        </section>
        <section className="articles-home">
          <div className="home-filter">
            <h6 className="article-h4">Blog</h6>
            <FilterListRounded fontSize="small" />
          </div>
          <ArticlePosts category="publication" />
        </section>
        <section className="articles-home" id="article">
          <div className="home-filter">
            <h6 className="article-h4">Artigos</h6>
            <FilterListRounded fontSize="small" />
          </div>
          <Article />
        </section>
      </section>
      <Footer />
    </>
  );
}
