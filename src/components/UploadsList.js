import React from 'react'
import { Cards } from './Cards'

const UploadList = ({medias, isAdmin}) => {
  return (
    <div className="container">
        <div className="row my-2">
       {medias && medias.map((media)=>{
        return <Cards isAdmin={isAdmin} key={media._id} media={media}/>
       })}
    </div>
  </div>
  )
}

export default UploadList;
