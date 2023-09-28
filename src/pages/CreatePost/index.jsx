import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "./../../contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../services/FirebaseConfig";
import "./styles.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const [progress, setProgress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="create-container container">
      <form onSubmit={handleSubmit} className="create-content">
        <h2 className="create-title">Criar puiblicação</h2>
        <label className="create-item">
          <input
            type="text"
            name="title"
            required
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-input"
          />
        </label>
        <label className="create-item">
          <input
            type="file"
            name="title"
            required
            placeholder="Selecionar Imagem"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="form-input"
          />
        </label>
        <label className="create-item">
          <textarea
            name="body"
            required
            placeholder="Descrição"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="form-input"
          />
        </label>
        <label className="create-item">
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="form-input"
          />
        </label>
        <button className="form-btn">Publicar</button>
        {/* {!loading && <button className="form-btn">Cadastrar</button>}
          {loading && <button className="form-btn">Aguarde</button>}
          {error && <p className="form-error">{error}</p>} */}
      </form>
    </div>
  );
}
