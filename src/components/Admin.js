import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./UploadForm";
import UploadsList from "./UploadsList";
import  {BACKEND_URI} from "../config/constants";
import { Spinner } from "./Spinner";

export const Admin = () => {
  const navigate = useNavigate();
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin]=useState(false)

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
        setIsAdmin(true)
        navigate("/admin");
        axios
          .get(`${BACKEND_URI}/api/v1/media/all`)
          .then((result) => {
            setMedias(result.data);
          })
          .catch((error) => {
            setMedias([]);
            console.log(error);
            alert("Error happened 3 !");
          });
      }
    }
  };
  useEffect(() => {
    checkAdmin();
  }, []);
  return (
    <>    
    {isLoading && <Spinner/>}
    {!isLoading && <> <UploadForm getAllMedias={checkAdmin} setIsLoading={setIsLoading}/> <UploadsList isAdmin={isAdmin} medias={medias}/></>}
    </>
  );
};
