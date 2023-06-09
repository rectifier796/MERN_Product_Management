import React from "react";
import { Link } from "react-router-dom";

function LayoutComponent() {
  return (
    <nav id="sidebar">
      <div className="custom-menu">
        <button type="button" id="sidebarCollapse" className="btn btn-primary">
          <i className="fa fa-bars"></i>
          <span className="sr-only">Toggle Menu</span>
        </button>
      </div>
      <h1>
        <Link to="/" className="logo">
          React Project
        </Link>
      </h1>
      <ul className="list-unstyled components mb-5">
        <li className="active">
          <Link to="/">
            <span className="fa fa-user mr-3"></span> Users
          </Link>
        </li>
        <li>
          <Link to="/product">
            <span className="fa fa-product-hunt mr-3"></span> Products
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default LayoutComponent;
