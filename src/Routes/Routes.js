import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Homepage from "../Homepage/Homepage";
import SignupForm from "../Auth/SignupForm";
import LoginForm from "../Auth/LoginForm";
import CompanyList from "../Companies/CompanyList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import JobDetail from "../Jobs/JobDetail";
import ProfileForm from "../Profile/ProfileForm";


function Routes({ signup, login }) {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup}/>
        </Route>
        <PrivateRoute exact path="/companies">
          <CompanyList />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <JobList />
        </PrivateRoute>
        <PrivateRoute path="/jobs/:id">
          <JobDetail />
        </PrivateRoute>
        <PrivateRoute path="/companies/:handle">
          <CompanyDetail />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default Routes;