import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './Common/UseLocalStorage';
import JoblyApi from './Api';
import UserContext from './Auth/UserContext';
import Navigation from './Routes/Navigation';
import Routes from './Routes/Routes';
import jwt from "jsonwebtoken";
import LoadingSpinner from './Common/Spinner';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly-token");
  const [applications, setApplications] = useState(null);

  useEffect(() => {
    async function getCurrUser() {
      if (token) {
        try {
          const { username } = jwt.decode(token);
          JoblyApi.token = token;
          const currUser = await JoblyApi.getCurrUser(username);
          setCurrUser(currUser);
          setApplications(Object.values(currUser.applications))
        } catch(err) {
          console.error("Error:", err);
          setCurrUser(null);
        }
      }
      setIsLoaded(true);
    }
    setIsLoaded(false);
    getCurrUser()
  }, [token])

  async function signup(data) {
    try {
      const token = await JoblyApi.signup(data);
      setToken(token);
      return {success: true}
    } catch(err) {
      console.log("Error:", err);
      return {success: false, err}
    }
  }

  async function login(data) {
    try {
      const token = await JoblyApi.login(data);
      setToken(token);
      return {success: true}
    } catch(err) {
      console.log("Errors:", err);
      return {success: false, err};
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
    localStorage.clear();
  }

  function hasAppliedForJob(jobId) {
    return applications.includes(jobId);
  }

  async function applyForJob(jobId) {
    try {
      console.log("in applyForJobs in app");
      const res = await JoblyApi.applyForJob(currUser.username, jobId);
      console.log("res from app apply", res);
      setApplications(a => ([...a, res.applied]));
      return res;
    } catch(err) {
      console.log("Errors", err);
      return err.message;
    }
  }

  if (!isLoaded) return <LoadingSpinner />

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser, applyForJob, hasAppliedForJob }}>
        <Navigation logout={logout}/>
        <Routes
          signup={signup}
          login={login}
        />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
