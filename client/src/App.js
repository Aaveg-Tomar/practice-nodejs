import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import SignIn from "./UserDetails/SignIn";
import SignOut from "./UserDetails/SignOut";
import CSignIn from "./CompanyDetails/CSignIn";
import CSignUp from "./CompanyDetails/CSignUp";
import UserFrom from "./UserDetails/UserFrom";
import UserProfile from "./UserDetails/UserProfile";
import JobDetail from "./jobdetails/JobDetail";
import SignUp from "./UserDetails/SignUp"
import JobsPosted from "./CompanyDetails/JobsPosted";


function App() {

  



  return (
    <>
      <Router>
        <Routes>
          <Route path="/signIn" Component={ SignIn} />
          <Route path="/signUp" Component={SignUp} />
          <Route path="/" Component={Dashboard}/>
          <Route path="/csignIn" Component={CSignIn}/>
          <Route path="/csignUp" Component={CSignUp}/>
          <Route path="/userInfo" Component={UserFrom}/>
          <Route path="/userProfile" Component={UserProfile}/>
          <Route path="/jobDetails" Component={JobDetail}/>
          <Route path= "/jobPosted" Component={JobsPosted}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
