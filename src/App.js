import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LandingPage from "./components/LandingPage";
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { Account } from "./Account";

// Configure AWS Amplify with both local aws-exports and outputs.json
Amplify.configure(awsExports);
Amplify.configure(outputs);

// Protect routes that require authentication
function RequireAuth({ children }) {
  const { user } = useAuthenticator((context) => [context.user]);

  return user ? children : <Navigate to="/" />;
}

// Main App component
function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          {/* Routes for sign-in and sign-up */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Landing Page route */}
          <Route
            path="/landing"
            element={
              <RequireAuth>
                <LandingPage />
                <button onClick={() => Authenticator.signOut()}>Sign out</button>
              </RequireAuth>
            }
          />
          
          {/* Account page route, protected */}
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
