import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import PhotosContext from '../context/PhotosContext'
export default function UploadPage(){
  const { addPhoto } = useContext(PhotosContext)
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [busy, setBusy] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const navigate = useNavigate()
  function handleFile(e){
    const f = e.target.files[0]
    if(f) setFile(f)
  }
  function compressImage(file, maxWidth, quality){
    return new Promise((resolve)=>{
      const reader = new FileReader()
      reader.onload = (e)=>{
        const img = new Image()
        img.onload = ()=>{
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          if(width > maxWidth){
            height = (height * maxWidth) / width
            width = maxWidth
          }
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          resolve(canvas.toDataURL('image/jpeg', quality))
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    })
  }
  async function handleSubmit(e){
    e.preventDefault()
    if(!file) return
    setBusy(true)
    setUploadProgress('Processing image...')
    try{
      const compressed = await compressImage(file, 1200, 0.8)
      setUploadProgress('Saving photo...')
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8)
      const entry = {
        id,
        title: title || 'Untitled',
        description: desc || '',
        imageUrl: compressed,
        createdAt: Date.now()
      }
      addPhoto(entry)
      setUploadProgress('')
      setBusy(false)
      setFile(null)
      setTitle('')
      setDesc('')
      navigate('/')
    }catch(error){
      console.error('Upload error:', error)
      setUploadProgress('')
      setBusy(false)
      alert('Upload failed. Please try again.')
    }
  }
  return (
    <div className="card upload-card">
      <h2>Upload a Photo</h2>
      <form onSubmit={handleSubmit} className="form">
        <label className="field">
          <span className="label">Photo</span>
          <div className="file-input-wrapper">
            <input type="file" accept="image/*" onChange={handleFile} id="photo-upload" className="file-input" />
            <label htmlFor="photo-upload" className="file-label">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
              <span>{file ? file.name : 'Choose a photo'}</span>
            </label>
          </div>
        </label>
        <label className="field">
          <span className="label">Title</span>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Add a title" />
        </label>
        <label className="field">
          <span className="label">Description</span>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Add a description" />
        </label>
        {uploadProgress && <div className="progress-text">{uploadProgress}</div>}
        <div className="actions">
          <button className="btn primary" type="submit" disabled={busy}>{busy? 'Uploading...' : 'Upload Photo'}</button>
          <button className="btn" type="button" onClick={()=>{setFile(null); setTitle(''); setDesc('')}} disabled={busy}>Reset</button>
        </div>
      </form>
    </div>
  )
}
