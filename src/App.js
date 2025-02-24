import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify'; 
import awsconfig from './aws-exports'; 

import SignIn from './SignIn';
import SignUp from './SignUp';

Amplify.configure(awsconfig); 

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //userAuth
    Auth.currentAuthenticatedUser()
      .then((userData) => setUser(userData))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={user ? <h1>Welcome, {user.username}!</h1> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
