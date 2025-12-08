import { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedOTPRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const otpEmail = sessionStorage.getItem("otp-email");

  // If user already logged in → skip OTP
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  // User should not access OTP without login email
  if (!otpEmail) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedOTPRoute;
