import React, { useState, useRef } from "react";
import icon from "./default.PNG";
import "./ProfileCard.css";
function ProfileCard({ setImage }) {
  const [selectedImage, setSelectedImage] = useState(icon);
  const fileInputRef = useRef();
  const imageRef = useRef();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        let img = new Image();
        img.onload = () => {
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          canvas.width = imageRef.current.width;
          canvas.height = imageRef.current.height;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const newImage = canvas.toDataURL();
          setSelectedImage(newImage);
          setImage(newImage); // Set image in parent component
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1 className="profile-pic-sentence">Profile Picture</h1>
      <img
        ref={imageRef}
        src={selectedImage}
        alt="Avatar"
        className="avatar"
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ProfileCard;
