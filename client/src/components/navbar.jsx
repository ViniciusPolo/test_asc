import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Navbar(props) {
  const history = useNavigate();

  const [responsiveMenu, setResponsiveMenu] = useState(false);

  return (
    <>
      {responsiveMenu && (
        <div
          className="position-absolute top-0 end-0 mt-5 me-3"
          onClick={() => setResponsiveMenu(false)}
        >
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                  <Link className="nav-link active" to="/">
                    Login
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link className="nav-link active" to="/inserir">
                    Inserir Novos Contatos
                  </Link>
                </li>
            </ul>
          </div>
        </div>
      )}
      <nav class="navbar navbar-expand-lg bg-body-tertiary nav-color">
        <Link class="navbar-brand" to="/">
          ASC BRAZIL
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setResponsiveMenu(true)}
          onMouseLeave={() => setResponsiveMenu(false)}
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
                <Link class="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link class="nav-link active" to="/inserir">
                  Inserir Novos Contatos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="form-inline my-2 my-lg-0">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("valid_token") == "true" && (
                <li
                  class="nav-item"
                  onClick={() =>
                    localStorage.setItem("valid_token", false) &&
                    localStorage.setItem("x-access-token", "")
                  }
                >
                  <Link class="nav-link active" to="/login">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </form>
        </div>
      </nav>
    </>
  );
}