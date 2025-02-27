import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LandingPage from "./components/LandingPage";
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';
import { Account } from "./Account";

Amplify.configure(outputs);

function RequireAuth({ children }) {
  const { user } = useAuthenticator((context) => [context.user]);

  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/landing"
            element={
              <RequireAuth>
                <LandingPage />
                <button onClick={() => Authenticator.signOut()}>Sign out</button>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </Authenticator.Provider>
  );
}

export default App;
