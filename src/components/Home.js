import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadList from "./UploadsList";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";
import "../static/Home.css"
import girl from "../static/images/girl_rem.png"

export const Home = () => {
  const [medias, setMedias] = useState([]);
  const [query, setQuery] = useState("");

  const handleClick = async () => {
    axios
      .post(`${BACKEND_URI}/api/v1/media/search`, {
        query
      })
      .then((result) => {
        setMedias(result.data);

      })
      .catch((error) => {
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

  useEffect(() => {
    handleClick();
  }, [query]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  const handleCategory = (category) => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/${category}`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened category !");
      });
  }
  return (
    <div>
      <div class="row-1">
        <div class="text-cont">
          <div>Podcasts</div>
          <div className="pickup">Join the conversation that everyone's listening to.</div>
        </div>
        <div class="girl-cont">
          <img className="girl" src={girl} alt="" />
        </div>
      </div>

      <div class="search-cont">
        <div class="search">
          <form class="d-flex text-light search" role="search">
            <div onClick={handleClick} class="search-btn" type="submit"><i class="fa fa-lg fa-search"></i></div>
            <input value={query} onChange={(e) => { setQuery(e.target.value) }} class="search-ip" type="search" placeholder="Listen in and level up - Search for this podcast now!" aria-label="Search" />
          </form>
        </div>
      </div>

      <UploadList medias={medias} />

      <div className="cat-cont">
        <div class="cat-head">Categories</div>
        <div class="row cat-cards">
          <div className="col cat-card Ed" onClick={() => { handleCategory("Education") }}>Educational</div>
          <div className="col cat-card Bu" onClick={() => { handleCategory("Business") }}>Business</div>
          <div className="col cat-card Te" onClick={() => { handleCategory("Technology") }}>Technology</div>
          <div className="col cat-card So" onClick={() => { handleCategory("Society & Culture") }}>Society and Culture</div>
          <div className="col cat-card Co" onClick={() => { handleCategory("Comedy") }}>Comedy</div>
        </div>
      </div>
    </div>
  );
};
