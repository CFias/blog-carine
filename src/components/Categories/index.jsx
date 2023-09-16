import { NavLink } from "react-router-dom";
import "./styles.css";

export default function Categories() {
  return (
    <nav className="cat-container">
      <ul className="cat-content">
        <li>
          <NavLink to="/podcast" className="cat-item">
               Podcast
          </NavLink>
        </li>
        <li>
          <NavLink to="/palestra" className="cat-item">
               Palestras
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
