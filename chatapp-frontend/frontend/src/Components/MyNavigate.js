import React from "react";
import { Link } from "react-router-dom";

export const MyNavigate = () => {
  return (
    <>
      <div className="navigatelogo">
        <div>
          <img src="../assets/images/blue-1.svg" />
        </div>
        <div className="d-flex flex-row justify-content-end gap-5">
          <Link className="navigation" to="/register">
            Register
          </Link>
          <Link className="navigation" to="/login">
            Login
          </Link>
          <Link className="navigation" to="/chat">
            Chat
          </Link>
        </div>
      </div>
    </>
  );
};
