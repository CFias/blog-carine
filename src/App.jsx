import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

// Components
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
import Contact from "./pages/Contact";
import Podcasts from "./pages/Podcasts";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import AdminPostManager from "./pages/AdminPostManager/AdminPostManager";
import CLoading from "../src/assets/image/CLoading.gif";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { History } from "./pages/History/History";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";

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
    return (
      <div className="loading-main">
        <img className="cloading" src={CLoading} alt="" />
      </div>
    );
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/article" element={<ArticlePage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/adm" element={<AdminPostManager />} />
            </Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
