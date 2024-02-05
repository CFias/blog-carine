import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/index";
import BottomBar from "./components/BottomBar";

// hooks
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// context
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login/index";
// import DarkMode from "./components/DarkMode";
// import Gallery from "./pages/Gallery";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

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
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          {/* <DarkMode /> */}
          <BottomBar />
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
            {/* <Route path="/gallery" element={<Gallery />} /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
