import React, { useEffect, useState } from "react";
import "./styles.css";
import ArticlePosts from "../../components/ArticlePosts/ArticlePosts";
import Banner from "../../components/Banner/index";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FilterListRounded } from "@mui/icons-material";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { db } from "../../services/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Article from "../../components/Article/Article";

export default function Home() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Filtrar por:");

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
    }
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter) => {
    setAnchorEl(null);
    setSelectedFilter(filter);
    // Aqui você pode aplicar o filtro na lista de posts
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-menu" : undefined;

  return (
    <>
      <Navbar />
      <section className="main-container">
        <section className="banner-section">
          <Banner featuredPosts={featuredPosts} />
        </section>
        <section className="articles-home">
          <div className="home-filter">
            <Typography variant="h6" className="filter-text">
              Blog
            </Typography>
            <div className="filter-container">
              <Typography variant="body1" className="selected-filter-text">
                {selectedFilter}
              </Typography>
              <IconButton
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleFilterClick}
              >
                <FilterListRounded fontSize="small" />
              </IconButton>
              <Menu
                id={id}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleFilterClose(selectedFilter)}
              >
                <MenuItem onClick={() => handleFilterClose("Filtrar por:")}>
                  Filtrar por:
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Podcast")}>
                  Podcast
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Palestra")}>
                  Palestra
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Trabalho")}>
                  Trabalho
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Estudo")}>
                  Estudo
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Certificado")}>
                  Certificado
                </MenuItem>
              </Menu>
            </div>
          </div>
          <ArticlePosts category="publication" filter={selectedFilter} />
        </section>
        <section className="articles-home" id="article">
          <div className="home-filter">
            <Typography variant="h6" className="filter-text">
              Artigos
            </Typography>
            <div className="filter-container">
              <Typography variant="body1" className="selected-filter-text">
                {selectedFilter}
              </Typography>
              <IconButton
                aria-controls={id}
                aria-haspopup="true"
                onClick={handleFilterClick}
              >
                <FilterListRounded fontSize="small" />
              </IconButton>
              <Menu
                id={id}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleFilterClose(selectedFilter)}
              >
                <MenuItem onClick={() => handleFilterClose("Filtrar por:")}>
                  Filtrar por:
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Podcast")}>
                  Podcast
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Palestra")}>
                  Palestra
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Trabalho")}>
                  Trabalho
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Estudo")}>
                  Estudo
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose("Certificado")}>
                  Certificado
                </MenuItem>
              </Menu>
            </div>
          </div>
          <Article category={selectedFilter} />
        </section>
      </section>
      <Footer />
    </>
  );
}
