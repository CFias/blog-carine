import { NavLink } from "react-router-dom";
import "./styles.css";
import { AddPhotoAlternateRounded, Article } from "@mui/icons-material";

export default function Categories() {
  return (
    <div className="add-posts-container container">
      <div className="add-posts-content">
        <img
          className="add-img-profile"
          src="https://media.licdn.com/dms/image/D4D03AQFwzJ4ebw2CyA/profile-displayphoto-shrink_100_100/0/1689000908080?e=1700092800&v=beta&t=mfrLGrLmHr0hWVcXxHk1XRwt0SJBgPleHN42FFv0GC8"
          alt=""
        />
        <div className="add-posts-text">
          <input
            className="add-text"
            type="text"
            placeholder="Adicionar publicação"
          />
          <div className="add-posts-icons">
            <p className="add-icon-midia">
              <AddPhotoAlternateRounded className="add-img" />
              Mídia
            </p>
            <p className="add-icon-article">
              <Article className="add-article" />
              Escrever artigo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
