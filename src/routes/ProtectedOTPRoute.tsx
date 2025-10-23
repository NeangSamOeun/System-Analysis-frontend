import { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedOTPRoute = ({ children }: { children: JSX.Element }) => {
  const otpEmail = sessionStorage.getItem("otp-email");
  const token = localStorage.getItem("token");

    if (token) return <Navigate to="/dashboard" replace />;
    if (!otpEmail) return <Navigate to="/login" replace />;


//   return otpEmail ? children : <Navigate to="/login" replace />;
  return children;
};

export default ProtectedOTPRoute;
