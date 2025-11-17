import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import GalleryPage from './pages/GalleryPage'
import PhotoDetails from './pages/PhotoDetails'
import { PhotosProvider } from './context/PhotosContext'
export default function App(){
  return (
    <PhotosProvider>
      <div className="app">
        <header className="header">
          <div className="brand">Lumina Gallery</div>
          <nav>
            <Link to="/" className="navlink">Gallery</Link>
            <Link to="/upload" className="navlink">Upload</Link>
          </nav>
        </header>
        <main className="container">
          <Routes>
            <Route path="/" element={<GalleryPage/>} />
            <Route path="/upload" element={<UploadPage/>} />
            <Route path="/photo/:id" element={<PhotoDetails/>} />
          </Routes>
        </main>
        
      </div>
    </PhotosProvider>
  )
}
