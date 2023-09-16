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
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </>
>>>>>>> d3b88bb52ed574ed48a9c2f4071fe5f918e8aeaa
  );
}

export default App;
