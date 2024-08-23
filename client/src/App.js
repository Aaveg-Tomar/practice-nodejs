import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/dashboard" Component={Dashboard}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
