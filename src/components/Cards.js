import React from "react";
import "../static/index.css"
import { BACKEND_URI } from "../config/constants";
export const Cards = (props) => {
  return (
    <div className="col-md-4">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{props.media.name}</h5>
          <div className="flex-row gap-5"><div><h5 className="card-text">-- By {props.media.speaker}</h5><div><i className="fa-solid fa-trash mx-2"></i></div></div></div>          
          <video preload="auto" width="340" height="340" controls>
            <source src={`${props.media.videos}`} />
          </video>
        </div>
      </div>
    </div>
  );
};
