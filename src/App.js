import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
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
                  <Navigate to="/dashboard" />
                ) : (
                  <SignIn />  //Custom SignIn comp
                )
              )}
            </Authenticator>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <Authenticator>
              {({ signOut, user }) => (
                user ? (
                  <div>
                    <h1>Welcome, {user.username}!</h1>
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
