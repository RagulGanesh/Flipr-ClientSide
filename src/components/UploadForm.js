import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState(null);

  const hadleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    
    formdata.append("videos", videos);
    formdata.append("name", name);

    axios
      .post(`${BACKEND_URI}/api/v1/media/create`, formdata)
      .then((success) => {
        getAllMedias();
        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <>
      <form onSubmit={hadleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv,.mp3"
            onChange={(e) => {
              setVideos(e.target.files[0]);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;