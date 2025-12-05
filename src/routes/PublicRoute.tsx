import { JSX } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const otpEmail = sessionStorage.getItem("otp-email");

  // Already logged in → go to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is in OTP login process
  if (otpEmail) {
    return <Navigate to="/otp" replace />;
  }

  return children;
};

export default PublicRoute;
