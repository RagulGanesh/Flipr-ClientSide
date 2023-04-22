import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const UploadForm = ({ getAllMedias, setIsLoading }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [speaker, setSpeaker] = useState("");
  const [videos, setVideos] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true)

    let x=new Date().getTime()+videos.name
    console.log(x)
    // setFileName(x)
    const storageRef = ref(storage,x);
    const uploadTask = uploadBytesResumable(storageRef,videos);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
              axios
                .post(`${BACKEND_URI}/api/v1/media/create`, {
                  name,
                  description,
                  category,
                  speaker,
                  videos : downloadURL
                })
                .then((success) => {
                  getAllMedias();
                  setIsLoading(false)
                  // alert("Submitted successfully");
                })
                .catch((error) => {
                  console.log(error);
                  alert("Error happened  1 !");
                });

                

        });
      }
    );

    
    // let formdata = new FormData();

    // formdata.append("videos", videos);
    // formdata.append("name", name);

    // axios
    //   .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
    //   .then((success) => {
    //     getAllMedias();
    //     alert("Submitted successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     alert("Error happened!");
    //   });
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>

        <div class="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">
            Description
          </label>
          <textarea name="description" id="description" className="form-control"onChange={(e) => setDescription(e.target.value)} cols="30" rows="5"></textarea>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">
            Category
          </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="category"
            class="form-control"
            id="category"
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">
            Speaker
          </label>
          <input
            onChange={(e) => setSpeaker(e.target.value)}
            type="text"
            name="speaker"
            class="form-control"
            id="speaker"
            aria-describedby="emailHelp"
          />
        </div>

        <div class="mb-3">
          <label for="videos" class="form-label">
            Upload Video/Audio
          </label>
          <input
            type="file"
            name="videos"
            class="form-control"
            id="videos"
            multiple
            accept=".mp4, .mkv,.mp3"
            onChange={(e) => {
              setVideos(e.target.files[0]);
            }}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
