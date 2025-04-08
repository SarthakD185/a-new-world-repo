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
import ModeratorLandingPage from './components/moderator/ModeratorLandingPage';
import ModeratorManageUsers from './components/moderator/ModeratorManageUsersList';
import ModeratorTeamsList from './components/moderator/ModeratorTeamsList';
import { Account } from "./Account";
import BracketPage from './components/BracketPage';
//import Status from './Status';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicyPage';
import Security from './components/SecurityPage';
import ReportsPage from './components/ReportsPage';
import ModeratorTournamentEditPage from "./components/moderator/ModeratorTournamentEditPage";
import ModeratorViewDataPage from './components/moderator/ModeratorViewDataPage';
import TournamentPaymentPage from './components/tournament/TournamentPaymentPage';
import MarketerLandingPage from './components/marketer/MarketerLandingPage';
import PendingAccountApprovalPage from './components/profile/PendingAccountApprovalPage';
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
          <Route path="/bracket" element={<BracketPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/security" element={<Security />} />
          
          {/* Add dynamic route for Team Page */}
          <Route path="/team/:id" element={<TeamPage />} />

          {/* Admin and Moderator Routes */}
          <Route path="/adminLanding" element={<AdminLandingPage />} />
          <Route path="/adminManageUsers" element={<AdminManageUsersList />} />
          <Route path="/moderatorLanding" element={<ModeratorLandingPage />} />
          <Route path="/moderatorUsers" element={<ModeratorManageUsers />} />
          <Route path="/moderatorTeams" element={<ModeratorTeamsList />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/moderator/tournamentEdit" element={<ModeratorTournamentEditPage />} />
          <Route path="/moderator/viewData" element={<ModeratorViewDataPage />} />
          <Route path="/tournament/payment" element={<TournamentPaymentPage />} />
          <Route path="/marketer" element={<MarketerLandingPage />} />
          <Route path="/pendingAccountApproval" element={<PendingAccountApprovalPage />} />
        </Routes>

        <Footer />

      </Account>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
