import React, { useContext, useState } from "react";
import AvatarUpload from "./AvatarUpload";
import { Context } from "../../store/Context";

export default function UserAvatar() {
  const [upload, setUpload] = useState(false);
  const { userUploadedImage } = useContext(Context);
  const onClickButton = () => {
    setUpload(true);
  };
  const onClose = () => {
    setUpload(false);
  };
  const onOKClick = () => {
    setUpload(false);
  };
  return (
    <>
      {!userUploadedImage ? (
        <button style={{cursor:"pointer"}} onClick={onClickButton} className="USER">
          YOU
        </button>
      ) : (
        <button style={{cursor:"pointer"}} onClick={onClickButton} className="USER">
          <img src={userUploadedImage} alt="Image" className="BOT" />
        </button>
      )}
      {upload && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: "0",
            right: "0",
            margin: "auto auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "max-content",
              backgroundColor: "rgb(49, 39, 39, 0.5)",
              height: "50%",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              padding:"0 5%",
              position:"relative",
            }}
          >
            <AvatarUpload onClose={onClose} onOKClick={onOKClick} />
          </div>
        </div>
      )}
    </>
  );
}
