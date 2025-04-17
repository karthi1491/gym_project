import { AdminProvider } from './context/AdminContext'; // Import the AdminProvider
import { useState } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/user.login';
import UserRegistration from './pages/user.registration';



import './App.css'
import Register from './pages/Admin.registration';
import AdminLogin from './pages/Admin.login';
import AdminPreview from './pages/AdminPreview';


function App() {
  

  return (
    <>

    
     <BrowserRouter >
     <AdminProvider>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userregistration" element={<UserRegistration />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminregistration" element={<Register />} />
      <Route path="/adminpreview" element={<AdminPreview />} />
     
     </Routes>
     </AdminProvider>
     
     
     </BrowserRouter>
      
    </>
  )
}

export default App
