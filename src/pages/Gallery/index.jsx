import "./styles.css";
import { storage } from "../../services/FirebaseConfig";
import { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function AddPostShortcut() {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState([]);

  const handleSubmit = () => {
    if (img !== null) {
      const imgRef = ref(storage, `posts/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  useEffect(() => {
    listAll(ref(storage, "posts")).then((imgs) => {
      imgs.items.forEach((val) =>
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        })
      );
    });
  }, []);

  console.log(imgUrl);

  return (
    <section className="gallery-container container">
      <div className="gallery-content">
        <input
          className="gallery-in"
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button className="gallery-btn" onClick={handleSubmit}>
          Publicar
        </button>
      </div>
      {imgUrl.map((dataVal) => (
        <div className="gallery-imgs">
          <div className="img-title-txt">
            <h1 className="img-title">Olá!</h1>
            <p className="img-txt">Primeiro post</p>
          </div>
          <img src={dataVal} height="300px" width="300px" alt="" />
        </div>
      ))}
    </section>
  );
}
