import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AboutUs from './components/AboutUs';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <NavBar />
    
    <BrowserRouter>
      <Routes>
        {/* Set the default route for '/' */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
