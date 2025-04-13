import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/user.login';



import './App.css'


function App() {
  

  return (
    <>

    
     <BrowserRouter >
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
     </Routes>
     
     
     </BrowserRouter>
      
    </>
  )
}

export default App
