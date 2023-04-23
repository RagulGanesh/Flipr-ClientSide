import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadList from "./UploadsList";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";

export const Home = () => {
  const [medias, setMedias] = useState([]);
  const [query, setQuery] = useState("");

  const handleClick = async ()=>{
    axios
      .post(`${BACKEND_URI}/api/v1/media/search`,{
        query
      })
      .then((result) => {
        setMedias(result.data);
        
      })
      .catch((error)=>{
        setMedias([]);
        console.log(error);
        alert("Error happened 2 !");
      });
  };
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

  useEffect(()=>{
    handleClick();
  },[medias]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);
  return (
    <div>
      <div class="search">
        <form class="d-flex text-light search" role="search">
          <input style={{color:"white"}} value = {query} onChange={(e)=>{setQuery(e.target.value)}} class="search-ip" type="search" placeholder="Search" aria-label="Search"/>
          <button onClick={handleClick} class="search-btn" type="submit"></button>
        </form>
      </div>
      <UploadList medias={medias}/>
    </div>
  );
};
