import React, { use } from "react";
import { AuthContext } from "../context/Context";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { pathname } = useLocation();
  if (loading) {
    return <span className="loading loading-bars loading-xl"></span>;
  }
  if (!user) {
    return <Navigate state={pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
