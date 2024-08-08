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
import { format } from "date-fns";
import "./styles.css";
import { Delete, Edit } from "@mui/icons-material";

export default function AdminPostManager() {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([
    "publication",
    "article",
    "destaque",
    "storie", // Adicionando a categoria "storie"
  ]);
  const [category, setCategory] = useState("publication");
  const [filter, setFilter] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

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
          image:
            category === "publication" || category === "storie"
              ? finalImageUrl
              : "",
          title,
          caption,
          category,
          filter,
          author,
          isFeatured,
        });
      } else {
        await addDoc(collection(db, "posts"), {
          image:
            category === "publication" || category === "storie"
              ? finalImageUrl
              : "",
          title,
          caption,
          category,
          filter,
          author,
          isFeatured,
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
    setAuthor(post.author);
    setIsFeatured(post.isFeatured);
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
    setAuthor("");
    setIsFeatured(false);
    setIsModalOpen(false);
  };

  const filterPosts = (posts) => {
    return posts.filter((post) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm =
        post.caption && post.caption.toLowerCase().includes(searchTermLower);
      const matchesCategory = category === "all" || category === post.category;
      const matchesFilter = filter === "" || post.filter === filter;
      const matchesFeaturedStatus = !showOnlyFeatured || post.isFeatured;

      return (
        matchesSearchTerm &&
        matchesCategory &&
        matchesFilter &&
        matchesFeaturedStatus
      );
    });
  };

  const filterArticlesWithoutImage = (posts) => {
    return posts.filter((post) => post.category === "article" && !post.image);
  };

  const handleShowMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  const visiblePostsWithImage = filterPosts(posts)
    .filter((post) => post.image)
    .slice(0, visibleCount);

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
                      <option value="all">Todos</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat === "publication"
                            ? "Publicação com Imagem"
                            : cat === "article"
                            ? "Artigo sem Imagem"
                            : cat === "destaque"
                            ? "Destaque"
                            : cat === "storie"
                            ? "Storie"
                            : ""}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="post-filter" className="form-label">
                    <h3 className="form-title">Filtrar post</h3>
                    <select
                      className="form-input"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option disabled value="">
                        Selecione
                      </option>
                      <option value="Podcast">Podcast</option>
                      <option value="Palestra">Palestra</option>
                      <option value="Trabalho">Trabalho</option>
                      <option value="Estudo">Estudo</option>
                      <option value="Certificado">Certificado</option>
                    </select>
                  </label>
                  {(category === "publication" || category === "storie") && (
                    <label htmlFor="post-image" className="form-label">
                      <h3 className="form-title">Selecionar imagem</h3>
                      <input type="file" onChange={handleImageChange} />
                    </label>
                  )}
                  <label htmlFor="post-title" className="form-label">
                    <h3 className="form-title">Título do post</h3>
                    <textarea
                      className="form-input"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </label>
                  <label htmlFor="post-caption" className="form-label">
                    <h3 className="form-title">Legenda do post</h3>
                    <textarea
                      className="form-input"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </label>
                  <label htmlFor="post-author" className="form-label">
                    <h3
                      className="form
-title"
                    >
                      Autor
                    </h3>
                    <input
                      className="form-input"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </label>
                  <label htmlFor="post-featured" className="form-label-desc">
                    <h3 className="form-title">Destaque</h3>
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                    />
                  </label>
                  <label htmlFor="post-submit" className="form-label">
                    <button className="admin-btn" type="submit">
                      Criar/Atualizar Post
                    </button>
                  </label>
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
          <label htmlFor="show-featured" className="form-label">
            <h3 className="form-title">Mostrar apenas destaques</h3>
            <input
              type="checkbox"
              checked={showOnlyFeatured}
              onChange={(e) => setShowOnlyFeatured(e.target.checked)}
            />
          </label>
          <table className="post-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Imagem</th>
                <th>Título</th>
                <th>Legenda</th>
                <th>Categoria</th>
                <th>Filtro</th>
                <th>Autor</th>
                <th>Destaque</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {visiblePostsWithImage.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        width="100"
                        height="100"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{post.title}</td>
                  <td>{post.caption}</td>
                  <td>{post.category}</td>
                  <td>{post.filter}</td>
                  <td>{post.author}</td>
                  <td>{post.isFeatured ? "Sim" : "Não"}</td>
                  <td>{format(post.publishedAt, "MMM yyyy")}</td>
                  <td>
                    <button onClick={() => editPost(post)} className="edit-btn">
                      <Edit />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="delete-btn"
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filterPosts(posts).filter((post) => post.image).length >
            visibleCount && (
            <button onClick={handleShowMore} className="show-more-btn">
              Exibir Mais
            </button>
          )}
          <h3 className="list-title">Artigos sem Imagem</h3>
          <table className="post-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Legenda</th>
                <th>Categoria</th>
                <th>Filtro</th>
                <th>Autor</th>
                <th>Destaque</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filterArticlesWithoutImage(posts).map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.caption}</td>
                  <td>{post.category}</td>
                  <td>{post.filter}</td>
                  <td>{post.author}</td>
                  <td>{post.isFeatured ? "Sim" : "Não"}</td>
                  <td>{format(post.publishedAt, "MMM yyyy")}</td>
                  <td>
                    <button onClick={() => editPost(post)} className="edit-btn">
                      <Edit />
                    </button>
                    <button
                      onClick={() => deletePost(post.id)}
                      className="delete-btn"
                    >
                      <Delete />
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
