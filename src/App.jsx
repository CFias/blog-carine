<<<<<<< HEAD
<<<<<<< HEAD
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Banner />
      </BrowserRouter>
    </div>
=======
import { useState } from "react";
=======
>>>>>>> 40f1210296fd5f39fff3b7d0b25a4435c641cab0
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/index";
import Banner from "./components/Banner";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Modal from "./components/Modal";
import { AppProvider } from "./contexts/AppContext";
import Categories from "./components/Categories";
import BottomBar from "./components/BottomBar";
import Feed from "./pages/Feed";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <BottomBar />
          <Banner />
          <Feed />
          <Categories />
          <Modal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
>>>>>>> d3b88bb52ed574ed48a9c2f4071fe5f918e8aeaa
  );
};

export default App;
