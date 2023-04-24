import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadList from "./UploadsList";
import { BACKEND_URI } from "../config/constants";
import axios from "axios";
import "../static/index.css"
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

      <div className="cat-cont">
        <div class="cat-head">Search by categories</div>
        <div class="row cat-cards">
          <div className="col col-xl-2 cat-card Ed" onClick={() => { handleCategory("Education") }}>
            <span><i class="fa-solid fa-user-graduate fa-xl"></i></span>
            <span>Educational</span>
          </div>
          <div className="col col-xl-2 cat-card Bu" onClick={() => { handleCategory("Business") }}>
            <span><i class="fa-solid fa-briefcase fa-xl"></i></span>
            <span>Business</span>
          </div>
          <div className="col col-xl-2 cat-card Te" onClick={() => { handleCategory("Technology") }}>
            <span><i class="fa-solid fa-microchip fa-xl"></i></span>
            <span>Technology</span>
          </div>
          <div className="col col-xl-2 cat-card So" onClick={() => { handleCategory("Society & Culture") }}>
            <span><i class="fa-solid fa-heart fa-xl"></i></span>
            <span>Society and Culture</span>
          </div>
          <div className="col col-xl-2 cat-card Co" onClick={() => { handleCategory("Comedy") }}>
            <span><i class="fa-solid fa-masks-theater fa-xl"></i></span>
            <span>Comedy</span>
          </div>
        </div>
      </div>

      <UploadList medias={medias} />

      <footer
        class="text-center text-lg-start text-white"  style={{backgroundColor: "rgb(33, 33, 33)"}}>

        <section
          class="d-flex justify-content-between p-4 px-5"
          style={{color:"black",fontWeight:"bolder",backgroundColor: "rgb(255, 255, 255)"}}
        >

          <div class="me-5">
            <span>Get connected with us on social networks:</span>
          </div>



          <div>
            <a href="https://www.facebook.com/" target="_blank" class="text-white me-4">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" target="_blank"  class="text-white me-4">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://google.com/" target="_blank" class="text-white me-4">
              <i class="fab fa-google"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" class="text-white me-4">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" class="text-white me-4">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://www.github.com/" target="_blank" class="text-white me-4">
              <i class="fab fa-github"></i>
            </a>
          </div>

        </section>

        <section class="">
          <div class="container text-center text-md-start mt-5">

            <div class="row mt-3">

              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                <h6 class="text-uppercase fw-bold">Company name</h6>
                <hr
                  class="mb-4 mt-0 d-inline-block mx-auto"
                  style={{width: "60px", backgroundColor: "#7c4dff", height:"2px"}}
                />
                <p>
                  Here you can use rows and columns to organize your footer
                  content. Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit.
                </p>
              </div>

              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 class="text-uppercase fw-bold">Products</h6>
                <hr
                  class="mb-4 mt-0 d-inline-block mx-auto"
                  style={{width: "60px", backgroundColor: "#7c4dff", height: "2px"}}
                />
                <p>
                  <a href="#!" class="text-white">MDBootstrap</a>
                </p>
                <p>
                  <a href="#!" class="text-white">MDWordPress</a>
                </p>
                <p>
                  <a href="#!" class="text-white">BrandFlow</a>
                </p>
                <p>
                  <a href="#!" class="text-white">Bootstrap Angular</a>
                </p>
              </div>



              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 class="text-uppercase fw-bold">Useful links</h6>
                <hr
                  class="mb-4 mt-0 d-inline-block mx-auto"
                  style={{width: "60px", backgroundColor: "#7c4dff",height: "2px"}}
                />
                <p>
                  <a href="#!" class="text-white">Your Account</a>
                </p>
                <p>
                  <a href="#!" class="text-white">Become an Affiliate</a>
                </p>
                <p>
                  <a href="#!" class="text-white">Shipping Rates</a>
                </p>
                <p>
                  <a href="#!" class="text-white">Help</a>
                </p>
              </div>



              <div class="hemu col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                <h6 class="text-uppercase fw-bold">Contact</h6>
                <hr
                  class="mb-4 mt-0 d-inline-block mx-auto"
                  style={{width: "60p", backgroundColor: "#7c4dff", height: "2px"}}
                />
                <p><i class="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i class="fas fa-envelope mr-3"></i> info@example.com</p>
                <p><i class="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i class="fas fa-print mr-3"></i> + 01 234 567 89</p>
              </div>

            </div>

          </div>
        </section>

        <div
          class="text-center p-3"
          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
        >
          © 2020 Copyright:
          <a class="text-white" href="https://mdbootstrap.com/"
          >Podify.com</a
          >
        </div>

      </footer>

    </div>
  );
};
