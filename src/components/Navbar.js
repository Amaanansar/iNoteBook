import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navebar = () => {
let location = useLocation();
let history = useNavigate()
const loggedOut =()=> {
  localStorage.removeItem("token")
  history("/")
}

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Home">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
              <button className="btn btn-outline-success" type="button" onClick={loggedOut}>
                Logout
              </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navebar;
