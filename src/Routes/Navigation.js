import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import { Navbar, Nav, NavItem } from "reactstrap";
import "./Navigation.css";

function Navigation({ logout }) {
  const { currUser } = useContext(UserContext);
  console.debug("Navigation");

  function loggedInNav() {
    return (
      <Nav>
        <NavItem>
          <Link className="nav-link" to="/companies">Companies</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/jobs">Jobs</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/profile">Profile</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
        </NavItem>
      </Nav>
    )
  }

  function loggedOutNav() {
    return (
      <Nav>
        <NavItem>
          <Link className="nav-link" to="/login">Login</Link>
        </NavItem>
        <NavItem>
          <Link className="nav-link" to="/signup">Signup</Link>
        </NavItem>
      </Nav>
    )
  }

  return (
    <Navbar className="navBar mb-5" color="light">
      <Link className="navbar-brand text-decoration-none fw-bold" to="/">Jobly</Link>
      { currUser ? loggedInNav() : loggedOutNav() }
    </Navbar>
  )
}

export default Navigation;