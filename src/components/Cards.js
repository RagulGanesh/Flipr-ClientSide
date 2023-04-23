import React from "react";
import "../static/index.css"
import { BACKEND_URI } from "../config/constants";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase"
import { useNavigate } from "react-router-dom";
export const Cards = (props) => {
  const navigate = useNavigate();
  const handleClick=(e)=>{
      e.preventDefault();
      navigate(`/media/${props.media._id}`)
  }
  const handleDelete=async(id)=>{
    let newMedia = props.medias.filter((med) => { return med._id !== id })
    let delMedia=props.medias.filter((med)=>{return med._id === id})
    // console.log(delMedia.videos)
    let text = delMedia[0].videos
    let result = parseInt(text.lastIndexOf('o/')+2);
    let result1 ;
    if(parseInt(text.lastIndexOf('.mp4')) == -1)
      result1=parseInt(text.lastIndexOf('.mp3')+4);
    else
      result1=parseInt(text.lastIndexOf('.mp4')+4);

    let ans=text.substr(result,result1-result)

    let storageRef = ref(storage,ans)
    console.log(storageRef)
    deleteObject(storageRef).then(() => {
      // File deleted successfully
      alert("deleted successfully")
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error)
    });

    props.setMedias(newMedia)
    const response = await fetch(`${BACKEND_URI}/api/v1/media/deleteitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token')
      },
      // body: JSON.stringify(data),
    });
  }
  return (
    <div style={{cursor:"pointer"}} onClick={handleClick} className="col-md-4">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{props.media.name}</h5>
          <div className="flex-row gap-5"><div><h5 className="card-text">-- By {props.media.speaker}</h5><div>{props.isAdmin && <i className="fa-solid fa-trash mx-2" onClick={()=>{handleDelete(props.media._id)}}></i>}</div></div></div>          
          <video preload="auto" width="340" height="340" controls>
            <source src={`${props.media.videos}`} />
          </video>
        </div>
      </div>
    </div>
  );
};
