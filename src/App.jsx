import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/index";
import Banner from "./components/Banner";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Modal from "./components/Modal";
import { AppProvider } from "./contexts/AppContext";
import Categories from "./components/Categories";
import BottomBar from "./components/BottomBar";
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <BottomBar />
          <Banner />
          <Categories />
          <Modal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
