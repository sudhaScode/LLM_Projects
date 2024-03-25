import React, { useContext, useState } from "react";
import { Context } from "../../store/Context";

const AvatarUpload = ({ onClose, onOKClick }) => {
  const { setUserUploadedImage } = useContext(Context);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result);
      // You can save the image URL in the user's profile or session here
    };
    reader.readAsDataURL(file);
  };

  const onClickOnOk = () => {
    setUserUploadedImage(imageUrl);
    onOKClick();
  };

  return (
    <div>
      <div>
        <label
          style={{
            display: "flex",
            fontSize: "30px",
            color: "cornsilk",
            flexDirection: "column",
            padding:"3% 0"
          }}
        >
          Upload Avatar Image:
          <input className="file-input-button" style={{paddingTop:"5%",cursor:"pointer"}} type="file" onChange={handleImageChange} accept="image/*" />
        </label>
        {imageUrl && <img src={imageUrl} alt="Image" className="BOT" />}
      </div>
      <button
        onClick={onClose}
        style={{
          color: "#e2111c",
          padding: "3% 6%",
          borderWidth: "0",
          borderRadius: "10%",
          bottom: "10%",
          position: "absolute",
          cursor:"pointer",
        }}
      >
        Cancel
      </button>
      <button
        disabled={!imageUrl}
        onClick={onClickOnOk}
        style={{
          color: !imageUrl ? "rgb(225 221 235)":"#ffffff",
          padding: "3% 10%",
          borderWidth: "0",
          borderRadius: "10%",
          bottom: "10%",
          right: "10%",
          position: "absolute",
          background: imageUrl ? "rgb(57 57 223)" :"rgb(123 123 186)",
          cursor:!imageUrl?"default":"pointer",
        }}
      >
        Ok
      </button>
    </div>
  );
};

export default AvatarUpload;
