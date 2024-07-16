import React, { useState, useEffect } from "react";
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
import { useAuthValue } from "./../../contexts/AuthContext";
import { v4 } from "uuid";
import "./styles.css";
import {
  AddAPhoto,
  ArrowForward,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

export default function AddPost() {
  const { user } = useAuthValue();

  const [postUpload, setPostUpload] = useState(null);
  const [caption, setCaption] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
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
      console.error("Erro ao buscar posts: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (postUpload) {
      const imageRef = ref(storage, `posts/${postUpload.name + v4()}`);
      await uploadBytes(imageRef, postUpload);
      const imageUrl = await getDownloadURL(imageRef);

      await addPost(imageUrl, caption);
      setCaption("");
      setPostUpload(null);
    }
  };

  const addPost = async (image, caption) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        image,
        caption,
        completed: false,
        publishedAt: serverTimestamp(),
      });
      const newPost = {
        id: docRef.id,
        image,
        caption,
        completed: false,
        publishedAt: new Date(),
      };
      setPosts([newPost, ...posts]);
    } catch (error) {
      console.error("Erro ao adicionar post: ", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Erro ao excluir post: ", error);
    }
  };

  const handleUpdate = async (postId, newData) => {
    try {
      await updateDoc(doc(db, "posts", postId), newData);
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, ...newData } : post
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar post: ", error);
    }
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  return (
    <>
      {user ? (
        <section className="articles-container">
          <section className="todo-container">
            {posts
              .slice()
              .sort((a, b) => b.publishedAt - a.publishedAt)
              .map((post) => (
                <div className="post-card" key={post.id}>
                  <div className="post-caption">
                    <p className="caption">{post.caption}</p>
                    <div className="dropdown-content">
                      <button
                        className="articles-btn1"
                        onClick={() =>
                          handleUpdate(post.id, {
                            completed: !post.completed,
                          })
                        }
                      >
                        {post.completed ? (
                          <FavoriteBorder className="like" />
                        ) : (
                          <Favorite className="like" />
                        )}
                      </button>
                      <p className="post-date">
                        {post.publishedAt.toLocaleString()}
                      </p>
                      <button
                        className="articles-btn1"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Delete className="like" />
                      </button>
                    </div>
                  </div>
                  <img
                    src={post.image}
                    alt="Publicação"
                    onClick={() => openModal(post)}
                    className="post-image"
                  />
                  <div className="dropdown-content-mob">
                    <button
                      className="articles-btn1"
                      onClick={() =>
                        handleUpdate(post.id, {
                          completed: !post.completed,
                        })
                      }
                    >
                      {post.completed ? (
                        <FavoriteBorder className="like" />
                      ) : (
                        <Favorite className="like" />
                      )}
                    </button>
                    <p className="post-date">
                      {post.publishedAt.toLocaleString()}
                    </p>
                    <button
                      className="articles-btn1"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Delete className="like" />
                    </button>
                  </div>
                </div>
              ))}
          </section>
        </section>
      ) : (
        <section className="todo-container-off">
          {posts.map((post) => (
            <div
              className="post-card-off"
              key={post.id}
              onClick={() => openModal(post)}
            >
              <img src={post.image} alt="Publicação" className="post-image" />
              <div className="post-caption">
                <p className="caption">{post.caption}</p>
                <p className="post-date">{post.publishedAt.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </section>
      )}
      <section className="todo-container-off">
        {modalOpen && selectedPost && (
          <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <img
                src={selectedPost.image}
                alt="Publicação"
                className="post-image-modal"
              />
              <p className="post-caption">{selectedPost.caption}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
