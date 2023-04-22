import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import UploadsList from "./UploadList";
import  {BACKEND_URI } from "../config/constants";

export const Admin = () => {
  const navigate = useNavigate();
  const [medias, setMedias] = useState([]);

  const checkAdmin = async () => {
    
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      const response2 = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json2 = await response2.json();
      if (json2.role === "user") {
        navigate("/");
      } else {
        navigate("/admin");
        axios
          .get(`${BACKEND_URI}/api/v1/media/all`)
          .then((result) => {
            setMedias(result.data);
          })
          .catch((error) => {
            setMedias([]);
            console.log(error);
            alert("Error happened!");
          });
      }
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "800px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadForm getAllMedias={checkAdmin} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "800px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadsList medias={medias} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
