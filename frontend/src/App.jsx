import { AdminProvider } from './context/AdminContext'; // Import the AdminProvider
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/user.login';
import UserRegistration from './pages/user.registration';



import './App.css'
import Register from './pages/Admin.registration';
import AdminLogin from './pages/Admin.login';
import AdminPreview from './pages/AdminPreview';
import StartPage from './pages/StartPage';
import AdminCategorySelect from './pages/AdminCategorySelect';
import YogaRegistration from './pages/YogaRegistration';
import DanceRegistration from './pages/DanceRegistration';
import FoodRegistration from './pages/FoodRegistration';


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
      <Route path="/start" element={<StartPage />} />
      <Route path="/category-select" element={<AdminCategorySelect />} />
      <Route path="/yoga-registration" element={<YogaRegistration />} />
      <Route path="/dance-registration" element={<DanceRegistration />} />
      <Route path="/food-registration" element={<FoodRegistration />} />
     </Routes>
     </AdminProvider>
     
     
     </BrowserRouter>
      
    </>
  )
}

export default App
