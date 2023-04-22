import React from "react";
import "../static/index.css"
import { BACKEND_URI } from "../config/constants";
import { ref, deleteObject } from "firebase/storage";

import { storage } from "../firebase"
export const Cards = (props) => {
  
  const handleDelete=async(id)=>{
    let newMedia = props.medias.filter((med) => { return med._id !== id })
    let delMedia=props.medias.filter((med)=>{return med._id === id})
    let storageRef = ref(storage,delMedia.videos)
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
    <div className="col-md-4">
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
