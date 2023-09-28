import { NavLink } from "react-router-dom";
import "./styles.css";
import { AddPhotoAlternateRounded, Article } from "@mui/icons-material";

export default function AddPostShortcut() {
  return (
    <article className="add-posts-container container">
      <div className="add-posts-content">
        <div className="add-post-input">
          <img
            className="add-img-profile"
            src="https://media.licdn.com/dms/image/D4D03AQF9HZmFqoBrZg/profile-displayphoto-shrink_100_100/0/1695645600115?e=1701302400&v=beta&t=H6sc1ovst8Cw4si4r5ZkTFvyakg8HfdxNAuxzZ0_u9A"
            alt=""
          />
          <input
            className="add-text"
            type="text"
            placeholder="Adicionar publicação"
          />
        </div>
        <div className="add-posts-text">
          <div className="add-posts-icons">
            <p className="add-icon-midia">
              <AddPhotoAlternateRounded className="add-img" />
              Mídia
            </p>
            <a href="" className="add-icon-article">
              <Article className="add-article" />
              Escrever artigo
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
