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
  );
}

export default App;
