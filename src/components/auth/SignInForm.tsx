// src/components/auth/SignInForm.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { login } from "../../services/authService";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // React Router navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const data = await login(username, password);

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      console.log("Login success", data);

      // Navigate to home page
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 sm:p-10">
        {/* <Link
          to="/TailAdmin/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-6"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link> */}

        <h1 className="mb-2 font-semibold text-gray-800 text-2xl dark:text-white">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your username and password to sign in!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <Label>
              Username <span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Label>
              Password <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>

          {/* Keep me logged in */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox checked={isChecked} onChange={setIsChecked} />
              <span className="block font-normal text-gray-700 dark:text-gray-400 text-sm">
                Keep me logged in
              </span>
            </div>
            <Link
              to="#!"
              className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Forgot password?
            </Link>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit button */}
          <div>
            <Button type="submit" className="w-full" size="sm">
              Sign In
            </Button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-700 dark:text-gray-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
