import React, { useEffect, useState } from "react";
import { db, storage } from "../../services/FirebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useAuthValue } from "./../../contexts/AuthContext";
import { v4 } from "uuid";
import "./styles.css";
import Todo from "../../components/Todo";
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";

export default function Articles() {
  const { user } = useAuthValue();

  const [postUpload, setPostUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [todos, setTodos] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title !== "") {
      await addDoc(collection(db, "todos"), {
        title,
        image: (imageListRef),
        completed: false,
      });
      setTitle("");
    }

    
    if (postUpload == null) return;
    
    const imageRef = ref(storage, `posts/${postUpload.name + v4()}`);
    
    uploadBytes(imageRef, postUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const imageListRef = ref(storage, "posts/");

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
    {user ? (
      <section className="articles-container">
      <div className="articles-add">
        <input
          className="articles-desc"
          type="text"
          placeholder="Descrição"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="articles-img"
          type="file"
          onChange={(e) => {
            setPostUpload(e.target.files[0]);
          }}
        />
        <button className="articles-btn" onClick={handleSubmit}>
          Publicar
        </button>
      </div>

      <section className="todo-container">
        {todos.map((todo, index) => (
          <div className="posts" key={index}>
            <Todo todo={todo} />
            {imageList[index] && (
              <img
                src={imageList[index]}
                className="post-img"
                alt={`Post ${index + 1}`}
              />
            )}
          </div>
        ))}
      </section>
    </section>
    ) : (
      <section className="articles-container">
        <section className="todo-container">
          {todos.map((todo, index) => (
            <div className="posts" key={index}>
              <Todo todo={todo} />
              {imageList[index] && (
                <img
                  src={imageList[index]}
                  className="post-img"
                  alt={`Post ${index + 1}`}
                />
              )}
            </div>
          ))}
        </section>
      </section>
    )}
    </>
  );
}
