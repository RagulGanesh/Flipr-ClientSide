import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadList from "./UploadsList";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";

export const Home = () => {
  const [medias, setMedias] = useState([]);
  const checkAdmin = async () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened 2 !");
      });
  };
  useEffect(() => {
    checkAdmin();
  }, []);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);
  return (
    <div>
      <UploadList medias={medias}/>
    </div>
  );
};
