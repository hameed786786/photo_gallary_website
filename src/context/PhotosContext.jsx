import React, { createContext, useState, useEffect } from 'react'
const PhotosContext = createContext(null)
export function PhotosProvider({ children }){
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    const raw = localStorage.getItem('photos')
    if(raw){
      try{
        setPhotos(JSON.parse(raw))
      }catch(e){
        setPhotos([])
      }
    }
  },[])
  useEffect(()=>{
    try{
      localStorage.setItem('photos', JSON.stringify(photos))
    }catch(e){
      if(e.name === 'QuotaExceededError'){
        alert('Storage limit reached. Please delete some photos to upload new ones.')
      }
    }
  },[photos])
  function addPhoto(entry){
    setPhotos(prev=>[entry, ...prev])
  }
  function deletePhoto(id){
    setPhotos(prev=>prev.filter(p=>p.id!==id))
  }
  function getPhotoById(id){
    return photos.find(p=>p.id===id)
  }
  return (
    <PhotosContext.Provider value={{photos, addPhoto, deletePhoto, getPhotoById, loading}}>
      {children}
    </PhotosContext.Provider>
  )
}
export default PhotosContext
