import React, { useEffect, useState } from "react";
import { db, storage } from "../../services/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { Delete, Edit } from "@mui/icons-material";

export default function AdminPostManager() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(""); // Novo estado para o nome do autor
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("publication");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const postsCollection = collection(db, "posts");
      const snapshot = await getDocs(postsCollection);
      const fetchedPosts = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          publishedAt: data.publishedAt.toDate(),
        };
      });
      setPosts(fetchedPosts);
    } catch (error) {
      alert("Erro ao buscar posts: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
    }
  };

  const uploadImage = async (file) => {
    const uniqueFileName = `images-${uuidv4()}-${file.name}`;
    const imageRef = ref(storage, `images/${uniqueFileName}`);
    await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(imageRef);
    return imageURL;
  };

  const createOrUpdatePost = async () => {
    try {
      let finalImageUrl = imageUrl;
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      if (editingPostId) {
        await updateDoc(doc(db, "posts", editingPostId), {
          image: category === "publication" ? finalImageUrl : "",
          title,
          caption,
          category,
          filter,
          author, // Incluir o nome do autor ao atualizar o documento
        });
      } else {
        await addDoc(collection(db, "posts"), {
          image: category === "publication" ? finalImageUrl : "",
          title,
          caption,
          category,
          filter,
          author, 
          publishedAt: serverTimestamp(),
        });
      }

      clearForm();
      getPosts();
      toast.success("Post adicionado/atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar/atualizar post:", error.message);
      toast.error("Erro ao adicionar/atualizar post: " + error.message);
    }
  };

  const editPost = (post) => {
    setEditingPostId(post.id);
    setImageUrl(post.image);
    setTitle(post.title);
    setCaption(post.caption);
    setCategory(post.category);
    setFilter(post.filter);
    setAuthor(post.author); // Carregar o nome do autor ao editar o post
    setIsModalOpen(true);
  };

  const deletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      getPosts();
    } catch (error) {
      alert("Erro ao deletar post: " + error.message);
    }
  };

  const clearForm = () => {
    setEditingPostId(null);
    setImageFile(null);
    setImageUrl("");
    setCaption("");
    setTitle("");
    setCategory("publication");
    setFilter("");
    setAuthor(""); // Limpar o estado do nome do autor ao limpar o formulário
    setIsModalOpen(false);
  };

  const filterPosts = (posts) => {
    return posts.filter((post) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        post.caption && post.caption.toLowerCase().includes(searchTermLower)
      );
    });
  };

  return (
    <section className="admin-container">
      <div className="posts-list">
        <NavLink to="/" className="nav-back">
          Voltar para o inicio
        </NavLink>
        <div className="add-post">
          <button className="modal-btn" onClick={() => setIsModalOpen(true)}>
            Adicionar Post
          </button>
          {isModalOpen && (
            <div className="modal">
              <span className="close" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <div className="modal-content">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    createOrUpdatePost();
                  }}
                  className="admin-form"
                >
                  <label htmlFor="post-category" className="form-label">
                    <h3 className="form-title">Categoria</h3>
                    <select
                      className="form-input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="publication">Publicação com Imagem</option>
                      <option value="article">Artigo sem Imagem</option>
                    </select>
                  </label>
                  <label htmlFor="post-category" className="form-label">
                    <h3 className="form-title">Filtrar post</h3>
                    <select
                      className="form-input"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option selected disabled value="nenhum">
                        Selecione
                      </option>
                      <option value="Podcast">Podcast</option>
                      <option value="Palestra">Palestra</option>
                      <option value="Trabalho">Trabalho</option>
                      <option value="Estudo">Estudo</option>
                      <option value="Certificado">Certificado</option>
                    </select>
                  </label>
                  {category === "publication" && (
                    <label htmlFor="post-image" className="form-label">
                      <h3 className="form-title">Selecionar imagem</h3>
                      <input type="file" onChange={handleImageChange} />
                    </label>
                  )}
                  <label htmlFor="post-caption" className="form-label">
                    <h3 className="form-title">Título do post</h3>
                    <textarea
                      className="form-input"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                  <label htmlFor="post-caption" className="form-label">
                    <h3 className="form-title">Legenda do post</h3>
                    <textarea
                      className="form-input"
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </label>
                  {/* Adicionar campo para capturar o nome do autor */}
                  <label htmlFor="post-author" className="form-label">
                    <h3 className="form-title">Autor</h3>
                    <input
                      className="form-input"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </label>
                  <button className="admin-btn" type="submit">
                    Criar/Atualizar Post
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="list-all">
          <h3 className="list-title">Lista de Posts</h3>
          <input
            className="admin-search"
            type="text"
            placeholder="Buscar por legenda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="post-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagem</th>
                <th>Categoria</th>
                <th>Data de Publicação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filterPosts(posts).map((post) => (
                <tr className="table-row" key={post.id}>
                  <td className="table-item">{post.id}</td>
                  <td className="table-item">
                    {post.category === "publication" && (
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="post-image"
                      />
                    )}
                  </td>
                  <td className="table-item">{post.category}</td>
                  <td className="table-item">
                    {post.publishedAt.toLocaleString()}
                  </td>
                  <td className="table-item-btn">
                    <button
                      className="table-btn edit-btn"
                      onClick={() => editPost(post)}
                    >
                      <Edit className="table-icon" fontSize="small" />
                    </button>
                    <button
                      className="table-btn delete-btn"
                      onClick={() => deletePost(post.id)}
                    >
                      <Delete className="table-icon" fontSize="small" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
