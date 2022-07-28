import style from "./ImageProfile.module.css";
import photoDefault from "../../../assets/User/silueta-1.jpg";
import { useEffect, useRef } from "react";
import { useState } from "react";
import axios from "axios";
import saveimg from "../../../assets/User/save-img.png";
import { API_URL } from "../../../config/enviroment";

const uploadProfileImage = async (file) => {
  let token = localStorage.getItem("token");
  try {
    let data = new FormData();
    data.append("image", file);

    const response = await axios.put(`${API_URL}/auth/profile/image`, data, {
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (e) {
    return { error: "Error al guardar la imagen" };
  }
};

export default function ImageProfile({ image = null }) {
  const [saveShow, setSaveShow] = useState("none");
  const [profileImg, setProfileImg] = useState(image);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const inputFile = useRef();

  const handleClick = () => {
    inputFile.current.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setProfileImg(e.target.result);
    if (file) reader.readAsDataURL(file);
    //validate
    let type = file.type.split("/")[1];
    if (!["png", "webp", "jpg", "jpeg"].includes(type)) {
      setSaveShow("none");
      return setError("Soportamos .jpg, .jpeg, .webp, .png");
    }

    if (file?.size > 1000000) {
      setSaveShow("none");
      return setError("Maximo permitido 1MB");
    }

    setError("");
    setSaveShow("block");
    setImageFile(file);
  };

  const handleSaveImage = () => {
    setSaving(true);
    if (imageFile !== null) {
      uploadProfileImage(imageFile)
        .then(() => {
          setSaving(false);
          setSaveShow("none");
          setError(null);
        })
        .catch((e) => {
          setSaving(false);
          setError(e.error);
          setSaveShow("none");
        });
    }
  };

  useEffect(() => setProfileImg(image), [image]);

  return (
    <div className={style.profileImg}>
      <button onClick={handleClick} className={style.previewProfile}>
        <img
          src={!profileImg ? photoDefault : profileImg}
          alt="Avatar"
          className={style.imgprofile}
        />
      </button>
      <button
        className={style.saveImage}
        onClick={handleSaveImage}
        style={{ display: saveShow }}
      >
        <img src={saveimg} alt="" />
      </button>
      {error !== "" ? <span>{error}</span> : null}
      
      <input
        type="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleFileInput}
        accept={"image/jpeg,image/png,image/jpg,image/webp"}
      />
    </div>
  );
}
