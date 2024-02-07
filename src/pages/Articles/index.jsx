import React, { useEffect, useState } from "react";
import { storage } from "../../services/FirebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useAuthValue } from "./../../contexts/AuthContext";
import { v4 } from "uuid";
import "./styles.css";

export default function Articles() {
  const [postUpload, setPostUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const { user } = useAuthValue();

  const imageListRef = ref(storage, "posts/");

  const uploadPost = () => {
    if (postUpload == null) return;

    const imageRef = ref(storage, `posts/${postUpload.name + v4()}`);

    uploadBytes(imageRef, postUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(res);
        });
      });
    });
  }, []);

  return (
    <>
      <section className="articles-container">
        {user && (
          <div className="articles-add">
            <input
              type="file"
              onChange={(e) => {
                setPostUpload(e.target.files[0]);
              }}
            />
            <button onClick={uploadPost}>Publicar</button>
          </div>
        )}
        <div className="post-content">
          <div className="post-img">
            <p className="post-title">Publicações</p>
            {imageList.map((url) => {
              return <img src={url} className="post-img" />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
