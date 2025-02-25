import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Auth } from 'aws-amplify';  

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Check if user is authenticated on app load
    Auth.currentAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const signOut = async () => {
    await Auth.signOut();
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <div>
                <SignIn />
              </div>
            )
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <div>
                <h1>Welcome, {user.username}!</h1>
                <button onClick={signOut}>Sign out</button>
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