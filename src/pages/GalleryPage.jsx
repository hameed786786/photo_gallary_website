import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PhotosContext from '../context/PhotosContext'
export default function GalleryPage(){
  const { photos, loading, deletePhoto } = useContext(PhotosContext)
  function handleDelete(e, id){
    e.preventDefault()
    if(confirm('Are you sure you want to delete this photo?')){
      deletePhoto(id)
    }
  }
  if(loading){
    return <div className="empty">Loading photos...</div>
  }
  return (
    <div>
      <div className="toolbar">
        <h2>Gallery</h2>
        <Link to="/upload" className="btn small">Add Photo</Link>
      </div>
      {photos.length===0 ? (
        <div className="empty">No photos yet. Use Upload to add your first photo.</div>
      ) : (
        <div className="grid">
          {photos.map(p=> (
            <div className="tile" key={p.id}>
              <Link to={`/photo/${p.id}`} className="tile-link">
                <div className="thumbwrap">
                  <img src={p.imageUrl || p.dataUrl} alt={p.title} className="thumb" />
                </div>
                <div className="meta">
                  <div className="title">{p.title}</div>
                  <div className="desc">{p.description}</div>
                </div>
              </Link>
              <button className="delete-btn" onClick={(e)=>handleDelete(e, p.id)} title="Delete photo">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
