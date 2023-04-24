import React from "react";
import "../static/index.css"
import { BACKEND_URI } from "../config/constants";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase"
import { useNavigate } from "react-router-dom";
import "../static/Card.css"
import "../static/index.css"

export const Cards = (props) => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/media/${props.media._id}`)
  }
  const handleDelete = async (id) => {
    let newMedia = props.medias.filter((med) => { return med._id !== id })
    let delMedia = props.medias.filter((med) => { return med._id === id })
    // console.log(delMedia.videos)
    let text = delMedia[0].videos
    let result = parseInt(text.lastIndexOf('o/') + 2);
    let result1;
    if (parseInt(text.lastIndexOf('.mp4')) === -1)
      result1 = parseInt(text.lastIndexOf('.mp3') + 4);
    else
      result1 = parseInt(text.lastIndexOf('.mp4') + 4);

    let ans = text.substr(result, result1 - result)

    let storageRef = ref(storage, ans)
    console.log(storageRef)
    deleteObject(storageRef).then(() => {
      alert("deleted successfully")
    }).catch((error) => {
      console.log(error)
    });

    props.setMedias(newMedia)
    const response = await fetch(`${BACKEND_URI}/api/v1/media/deleteitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      // body: JSON.stringify(data),
    });
  }
  return (
    <div className="col-lg-3 col-md-4 col-sm-6">
      <div className="card cd my-3">
        <div className="card-body cd-bd">

          <div style={{ cursor: "pointer" }} onClick={handleClick}>
            <img className="img-pod" src={props.media.thumbnail} alt="" />
          </div>

          <span className="card-title cd-ttl">{props.media.name}</span>

          <div className="flex-row gap-5">
            <div>
              <h5 className="card-text cd-spk">{props.media.speaker}</h5>
              <div>
                {props.isAdmin && <i className="fa-solid fa-trash mx-2" onClick={() => { handleDelete(props.media._id) }}></i>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
