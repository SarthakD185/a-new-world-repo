import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AboutUs from './components/AboutUsPage';
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import CollegePage from './components/college/CollegePage';
import IndividualCollegePage from './components/college/IndividualCollegePage';
import ProfilePage from './components/ProfilePage';
import ScrollToTop from './components/ScrollToTop';
import TournamentPage from './components/tournament/TournamentPage';
import IndividualTournamentPage from './components/tournament/IndividualTournamentPage';
import TeamPage from './components/TeamPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <NavBar />

    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Set the default route for '/' */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/colleges" element={<CollegePage />} />
        <Route path="/individualCollege" element={<IndividualCollegePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tournament" element={<TournamentPage />} />
        <Route path="/individualTournament" element={<IndividualTournamentPage />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
