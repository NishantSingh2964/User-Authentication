import { useState } from 'react';
import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import LoginSignUp from './Pages/LoginSignUp';
import NotFound from './Pages/NotFound';
import Layout from './Components/Layout';
import ProtectedRoute from './Components/ProtectedRoutes';
import About from './Pages/About';
import Blog from './Pages/Blog';
import Contact from './Pages/Contact';
import Profile from './Pages/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App;
