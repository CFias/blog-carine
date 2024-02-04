import { Edit, Person } from "@mui/icons-material";
import React from "react";
import "./styles.css";
import { imageDb } from "../../services/FirebaseConfig";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function Profile() {
  const [img, setImg] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState([]);

  const handleClick = () => {
    if (img !== null) {
      const imgRef = ref(imageDb, `profile/${v4()}`);
      uploadBytes(imgRef, img);
    }
  };

  React.useEffect(() => {
    listAll(ref(imageDb, "profile")).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-content">
        {imgUrl.map((dataVal) => (
          <div className="profile-photo">
            <img className="profile-img" src={dataVal} alt="Perfil" />
          </div>
        ))}
        <Person className="profile-icon-img" />
        <input
          className="profile-in"
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button onClick={handleClick}>Mudar</button>
        <div className="profile-bio">
          <h2>Cleidson Fias</h2>
          <Edit />
        </div>
      </div>
    </div>
  );
}
