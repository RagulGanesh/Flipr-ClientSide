import React, { useEffect, useState } from 'react'
import rcb from '../static/images/gamechangers.jpg'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URI } from '../config/constants'

const MediaPayload = () => {

    const {id} = useParams();
    const [data,setData] = useState({});
    const [play, setPlay] = useState(false);

    const getMedia = async ()=>{
        axios
            .get(`${BACKEND_URI}/api/v1/media/getmedia/${id}`)
            .then((result) => {
                setData(result.data.note);
              })
              .catch((error) => {
                console.log(error);
                alert("Error happened 7 !");
              });
    }
    useEffect(()=>{
        getMedia();
    },[])

  return (
    <div>
      {!play && <div class="top-cont bg-dark text-white d-flex px-6 p-5">
        <div>
            <img className='w-50' src={rcb} />
        </div>
        <div>
            <h1 style={{fontSize:"40px", fontWeight:"bolder"}}>{data.name}</h1>
            <div style={{fontSize:"30px", fontWeight:"bold"}} class="speaker">{data.speaker}</div>
            <div onClick={()=>{setPlay(true)}} class="play-btn p-2 "><i class="fa-solid fa-play fa-xl"></i></div>
        </div>
      </div>}
      {play &&
        <div class="video-cont">
            <video className='video' preload="auto" controls>
                <source src={`${data.videos}`} />
            </video>
        </div>}

      <div className="desc-cont bg-dark text-white " style={{backgroundColor:"red"}}>
            <div className='desc-text border border-2 rounded-3 m-3 p-5'>
                <h2>Description</h2>
                {data.description}
            </div>
      </div>
    </div>
  )
}

export default MediaPayload
