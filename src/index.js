import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />

    <BrowserRouter>
      <Routes>
        {/* Set the default route for '/' */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
