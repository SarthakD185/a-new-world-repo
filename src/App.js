import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "5vbl0me462jlpafj7p2fjoktv7";
    const logoutUri = "<logout uri>"; // Replace with your actual logout URI
    const cognitoDomain = "https://us-east-1qpvhhpjbg.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            auth.isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <div>
                <SignIn />
                <button onClick={() => auth.signinRedirect()}>Sign in</button>
              </div>
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            auth.isAuthenticated ? (
              <div>
                <h1>Welcome, {auth.user?.profile.email}!</h1>
                <button onClick={() => auth.removeUser()}>Sign out</button>
                <button onClick={signOutRedirect}>Sign out (Redirect)</button>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
