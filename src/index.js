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
import AdminLandingPage from './components/admin/AdminLandingPage';
import AdminManageUsersList from './components/admin/AdminManageUsersList';
import AdminUncompletedTasks from './components/admin/AdminUncompletedTasksList';
import ModeratorLandingPage from './components/moderator/ModeratorLandingPage';
import ModeratorManageUsers from './components/moderator/ModeratorManageUsersList';
import ModeratorTasks from './components/moderator/ModeratorUncompletedTasksList';
import { Account } from "./Account";
import Status from './Status';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
  
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      
      <Account>
        <NavBar />
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
          
          {/* Admin and Moderator Routes */}
          <Route path="/adminLanding" element={<AdminLandingPage />} />
          <Route path="/adminManageUsers" element={<AdminManageUsersList />} />
          <Route path="/adminTasks" element={<AdminUncompletedTasks />} />
          <Route path="/moderatorLanding" element={<ModeratorLandingPage />} />
          <Route path="/moderatorUsers" element={<ModeratorManageUsers />} />
          <Route path="/moderatorTasks" element={<ModeratorTasks />} />
        </Routes>
      </Account>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
