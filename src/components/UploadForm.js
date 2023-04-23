import React, { useState } from "react";
import { BACKEND_URI } from "../config/constants";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";

const UploadForm = ({ getAllMedias, setIsLoading, setIsForm }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [videos, setVideos] = useState(null);
  const [img, setImg] = useState(null);

  const options = [
    { label: "Society & Culture", value: "Society & Culture" },

    { label: "Education", value: "Education" },

    { label: "Business", value: "Business" },

    { label: "Comedy", value: "Comedy" },

    { label: "Technology", value: "Technology" },
  ];
  const [value, setValue] = React.useState("Society & Culture");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let imgstr = "";

  const handleThumbnail = (img, videos) => {
    let x = new Date().getTime() + img.name;

    const storageRef = ref(storage, x);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("default");
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;

          case "storage/unknown":
            break;
          default:
            console.log("default");
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          axios
            .put(`${BACKEND_URI}/api/v1/media/add`, {
              thumbnail: downloadURL,
              videos,
            })
            .then((success) => {
              getAllMedias();
              setIsLoading(false);
              setIsForm(false);
            })
            .catch((error) => {
              console.log(error);
              alert("Error videos !");
            });
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(imgstr);

    setIsLoading(true);

    let x = new Date().getTime() + videos.name;
    console.log(x);
    const storageRef = ref(storage, x);
    const uploadTask = uploadBytesResumable(storageRef, videos);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("default");
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            console.log("default");
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          axios
            .post(`${BACKEND_URI}/api/v1/media/create`, {
              name,
              description,
              category : value,
              speaker,
              thumbnail: imgstr,
              videos: downloadURL,
            })
            .then((success) => {
              getAllMedias();
              setIsLoading(false);
              setIsForm(false);
              // alert("Submitted successfully");
            })
            .catch((error) => {
              console.log(error);
              alert("Error happened  1 !");
            });
          handleThumbnail(img, downloadURL);
        });
      }
    );
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="5"
          ></textarea>
        </div>

        <div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category &nbsp;
              <select value={value} onChange={handleChange}>
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Category
          </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="category"
            className="form-control"
            id="category"
            aria-describedby="emailHelp"
          />
        </div> */}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Speaker
          </label>
          <input
            onChange={(e) => setSpeaker(e.target.value)}
            type="text"
            name="speaker"
            className="form-control"
            id="speaker"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Thumbnail
          </label>
          <input
            type="file"
            name="thumbnail"
            className="form-control"
            id="thumbnail"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="videos" className="form-label">
            Upload Video/Audio
          </label>
          <input
            type="file"
            name="videos"
            className="form-control"
            id="videos"
            multiple
            accept=".mp4, .mkv,.mp3"
            onChange={(e) => {
              setVideos(e.target.files[0]);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
