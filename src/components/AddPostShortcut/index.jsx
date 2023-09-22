import { NavLink } from "react-router-dom";
import "./styles.css";
import { AddPhotoAlternateRounded, Article } from "@mui/icons-material";
import { useAuthentication } from "./../../hooks/useAuthentication";

export default function AddPostShortcut() {
  const { user } = useAuthentication();

  console.log(typeof user);

  return (
    <article className="add-posts-container container">
      {user ? (
        <div className="add-posts-content">
          <div className="add-post-input">
            <img
              className="add-img-profile"
              src="https://media.licdn.com/dms/image/D4D03AQFwzJ4ebw2CyA/profile-displayphoto-shrink_100_100/0/1689000908080?e=1700092800&v=beta&t=mfrLGrLmHr0hWVcXxHk1XRwt0SJBgPleHN42FFv0GC8"
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
      ) : null}
    </article>
  );
}
