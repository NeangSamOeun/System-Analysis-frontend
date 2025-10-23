import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verify } from "../../services/otpService";

export default function OTPSign() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    try {
      setLoading(true);
      const response = await verify(otp);
      setLoading(false);

      alert(response.message);

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      setLoading(false);
      alert(err.response?.data || "Error verifying OTP ❌");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">

      {/* Top-left Circle */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-[#00143E] border-[6px] border-yellow-400 rounded-full"></div>

      {/* Bottom-right Circle */}
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#00143E] border-[6px] border-yellow-400 rounded-full"></div>

      {/* OTP Card */}
      <div className="bg-white shadow-md border rounded-3xl px-10 py-8 w-full max-w-xs text-center relative z-10">

        {/* Logo */}
        <img
          src="https://www.acledabank.com.kh/kh/assets/layout/logo-acs.png"
          className="mx-auto mb-5 w-28"
        />

        {/* OTP Input */}
        <div className="relative mb-3">
          <i className="fa fa-key absolute left-3 top-3 text-gray-500 text-sm"></i>
          <input
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            className="w-full pl-9 pr-3 py-2 border rounded-md bg-gray-100 focus:ring-1 focus:ring-blue-400 outline-none text-sm"
            placeholder="OTP"
          />
        </div>

        <p className="text-[11px] text-gray-500">OTP has been sent to your telegram!</p>
        <p className="text-[11px] text-gray-800 mt-1">Time Remaining:</p>
        <p className="text-[11px] text-gray-800 mb-5 font-medium">{formatTime()}</p>

        {/* Submit Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-[#000F3D] text-white py-2 rounded-md text-sm hover:bg-[#001a66] disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Login"}
        </button>

        {/* Forgot Password */}
        <p className="text-[11px] mt-3 cursor-pointer hover:underline">
          Forget your password?
        </p>

        {/* Footer */}
        <p className="text-[9px] mt-10 text-gray-400 leading-tight">
          Copyright 2025 by ACLEDA University of Business.
          <br />All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
