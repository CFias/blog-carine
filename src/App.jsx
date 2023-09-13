import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/index";
import Banner from "./components/Banner";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Modal from "./components/Modal";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Banner />
          <Modal children={<h1>Test</h1>} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
