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
import { Toaster } from "react-hot-toast";
import ForgotPassword from './Pages/ForgotPassword';
import WriteBlog from './Pages/WriteBlog';
import SingleBlog from './Pages/SingleBlog';
import ScrollToTop from './Components/ScrollToTop';


function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/write-blog" element={<WriteBlog />} />
            <Route path="/blog/:id" element={<SingleBlog/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

      </Routes>

    </>
  )
}

export default App;
