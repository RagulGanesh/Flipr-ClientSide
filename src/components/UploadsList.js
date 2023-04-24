import React from 'react'
import { Cards } from './Cards'
import "../static/index.css"
import "../static/UploadList.css"


const UploadList = ({ medias, isAdmin, setMedias }) => {
  return (
    <>
      <div className='podcats'>Best Episodes of the Week</div>
      <div className="list-cont">
        <div className="row my-2">
          {medias && medias.map((media) => {
            return <Cards isAdmin={isAdmin} key={media._id} media={media} setMedias={setMedias} medias={medias} />
          })}
        </div>
      </div>
    </>
  )
}

export default UploadList;
