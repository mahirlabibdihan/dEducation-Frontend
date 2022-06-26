import React, { useState, useEffect } from "react";
import ProfileController from "../../controller/profileController";
const profileController = new ProfileController();
const ProfilePic = () => {
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const ImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const getProfileData = async () => {
      const data = await profileController.getProfilePicture();
      setImage(data.image);
    };
    getProfileData();
  }, []);
  useEffect(() => {
    console.log("EFFECT");
    const setProfileImage = async () => {
      if (file > "") {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        console.log("Upload request");
        const result = await profileController.uploadImage(formData);
        console.log(result);
        if (result.success) {
          setImage(result.image);
        }
      }
    };
    setProfileImage();
  }, [file]);
  return (
    <>
      <img
        src={`http://localhost:5000/assets/images/${image}`}
        // onClick={() => ImageUpload()}
        alt=" "
      />
      <input type="file" onChange={ImageUpload}></input>
    </>
  );
};

export default ProfilePic;
