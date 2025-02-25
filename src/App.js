import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LandingPage from "./components/LandingPage"; // Import LandingPage
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import outputs from '@/amplify_outputs.json';  
import '@aws-amplify/ui-react/styles.css';  

Amplify.configure(outputs);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticator>
              {({ signOut, user }) => (
                user ? (
                  // Redirect to LandingPage if user is authenticated
                  <Navigate to="/landing" />
                ) : (
                  <SignIn />  // Custom SignIn component if user is not authenticated
                )
              )}
            </Authenticator>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/landing" 
          element={
            <Authenticator>
              {({ signOut, user }) => (
                user ? (
                  <div>
                    <LandingPage />
                    <button onClick={signOut}>Sign out</button>
                  </div>
                ) : (
                  <Navigate to="/" />  
                )
              )}
            </Authenticator>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
