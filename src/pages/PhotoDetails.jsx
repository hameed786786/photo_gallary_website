import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PhotosContext from '../context/PhotosContext'
export default function PhotoDetails(){
  const { id } = useParams()
  const navigate = useNavigate()
  const { getPhotoById } = useContext(PhotosContext)
  const photo = getPhotoById(id)
  if(!photo) return <div className="card">Photo not found</div>
  return (
    <div className="card details-card">
      <button className="btn back" onClick={()=>navigate(-1)}>Back to gallery</button>
      <div className="details">
        <img src={photo.imageUrl || photo.dataUrl} alt={photo.title} className="fullphoto" />
        <div className="info">
          <h3>{photo.title}</h3>
          <p>{photo.description}</p>
        </div>
      </div>
    </div>
  )
}
