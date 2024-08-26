import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import SignIn from "./UserDetails/SignIn";
import SignOut from "./UserDetails/SignOut";
import CSignIn from "./CompanyDetails/CSignIn";
import CSignUp from "./CompanyDetails/CSignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signin" Component={ SignIn} />
          <Route path="/signup" Component={SignOut} />
          <Route path="/" Component={Dashboard}/>
          <Route path="/csignin" Component={CSignIn}/>
          <Route path="/csignup" Component={CSignUp}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
