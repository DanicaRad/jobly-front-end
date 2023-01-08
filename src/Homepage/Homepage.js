import React, {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";

function Homepage() {
  const {currUser} = useContext(UserContext);
  
  return (
    <div className="flex justify-content-center align-content-center mt-5 pt-5">
      <div className="display-4 text-center text-primary p-2 mt-5">Jobly</div>
      <div className="h5 text-center p-2">All the jobs, in one convenient place.</div>
      { currUser ? 
        <div className="display-6 text-center">Welcome back, {currUser.username}!</div>
        : (
          <div className="d-flex justify-content-center gap-3">
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/signup">Signup</Link>
          </div>
        )
      }
    </div>
  )
};

export default Homepage;