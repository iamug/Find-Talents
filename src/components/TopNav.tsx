import React from "react";
import { NavLink, withRouter } from "react-router-dom";

const TopNav = (props: any) => {
  // const history = useHistory();
  console.log({ props2: props });
  return (
    <nav className="navbar navbar-expand-lg navbar-primary sticky-top px-0 shadow-lg">
      <div className="container px-3">
        <h1 className=" h3 text-primary">Find Talents</h1>

        <button
          className="navbar-toggler shadow-none text-primary position-relative  d-md-none "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample07"
          aria-controls="navbarsExample07"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
          <i className="fas fa-align-left" />
        </button>

        <div
          className="navbar-collapse collapse  px-3 flex-wrap align-items-center justify-content-lg-end "
          id="navbarsExample07"
        >
          <ul className="navbar-nav mb-2 mb-md-0">
            <li className="nav-item">
              <NavLink className="nav-link mx-2 h5" activeClassName="active" to={`${props.match.path}home`} exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link mx-2 h5" activeClassName="active" to={`${props.match.path}saved`} exact>
                Saved
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(TopNav);
