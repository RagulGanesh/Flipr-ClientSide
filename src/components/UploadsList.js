import React from 'react'
import { Cards } from './Cards'

const UploadList = ({medias, isAdmin, setMedias}) => {
  return (
    <div className="container">
        <div className="row my-2">
       {medias && medias.map((media)=>{
        return <Cards isAdmin={isAdmin} key={media._id} media={media} setMedias={setMedias} medias={medias}/>
       })}
    </div>
  </div>
  )
}

export default UploadList;
