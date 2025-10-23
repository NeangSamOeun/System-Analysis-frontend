// src/routes/ProtectedOTPRoute.tsx
import { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedOTPRoute = ({ children }: { children: JSX.Element }) => {
  const otpEmail = sessionStorage.getItem("otp-email"); // or your OTP state
  console.log('otpEmail', otpEmail);
  

  // If no email found → means user did NOT come from login/signup
  if (!otpEmail) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedOTPRoute;
