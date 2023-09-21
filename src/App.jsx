import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer/index";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Modal from "./components/Modal";
import { AppProvider } from "./contexts/AppContext";
import BottomBar from "./components/BottomBar";
import Profile from "./pages/Profile";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import AddPost from "./pages/AddPost";
import AddPostShortcut from "./components/AddPostShortcut";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { auth } = useAuthentication();
  const [user, setUser] = useState();

  const loadingUser = user === false;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <BrowserRouter>
        <AppProvider value={{ user }}>
          <Navbar />
          <BottomBar />
          <Banner />
          {user ? <AddPostShortcut /> : <Navigate to="/" />}
          <Modal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/addpost"
              element={user ? <AddPost /> : <Navigate to="/" />}
            />
            <Route path="/feed" element={<Feed />} />
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
