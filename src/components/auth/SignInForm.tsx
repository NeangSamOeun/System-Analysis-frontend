import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { login } from "../../services/authService";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      sessionStorage.setItem("otp-email", email);
      navigate("/otp");
    } catch (err: any) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">

      {/* Background Blue Circles */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-[#00143E] border-[6px] border-yellow-400 rounded-full"></div>
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-[#00143E] border-[6px] border-yellow-400 rounded-full"></div>

      {/* Login Box */}
      <div className="w-full max-w-md mx-auto bg-white rounded-[20px] shadow-md p-10 z-10 border border-gray-200">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="https://www.acledabank.com.kh/kh/assets/layout/logo-acs.png" alt="ACLEDA Logo" className="w-40" />
        </div>

        {/* FORM START ✅ */}
        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="mb-4">
            <Label>Username</Label>
            <div className="relative">
              <Input
                className="pl-10 rounded-xl bg-[#F2F2F2]"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa fa-user absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                className="pl-10 rounded-xl bg-[#F2F2F2]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="size-5 text-gray-500" />
                ) : (
                  <EyeCloseIcon className="size-5 text-gray-500" />
                )}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Login Button */}
          <Button
            variant="custom"
            type="submit"
            className="w-full rounded-xl bg-[#081A3E] hover:bg-[#0c244f] text-white"
            size="sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

        </form>
        {/* FORM END ✅ */}

        {/* Footer */}
        <p className="text-center mt-3 text-sm">
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            Forgot your password?
          </Link>
        </p>

        <p className="text-center text-gray-500 text-xs mt-6">
          Copyright 2025 by ACLEDA University of Business. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
