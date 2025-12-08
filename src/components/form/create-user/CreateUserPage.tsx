import { useState } from "react";
import API from "../../../environment/api";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";

const CreateUserPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    role: "Staff",
  });

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    email: false,
    password: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    switch (name) {
      case "firstName":
      case "lastName":
        setErrors((prev) => ({ ...prev, [name]: value.trim() === "" }));
        break;
      case "gender":
        setErrors((prev) => ({ ...prev, gender: value === "" }));
        break;
      case "email":
        setErrors((prev) => ({ ...prev, email: !validateEmail(value) }));
        break;
      case "password":
        setErrors((prev) => ({ ...prev, password: value.length < 6 }));
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newErrors = {
      firstName: form.firstName.trim() === "",
      lastName: form.lastName.trim() === "",
      gender: form.gender === "",
      email: !validateEmail(form.email),
      password: form.password.length < 6,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      setMessage("❌ Please fill all required fields correctly.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // 👉 Only send fields backend accepts
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        gender: form.gender,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      const res = await API.post("/users", payload);
      console.log('create user : ', res);
      

      setMessage("✅ User created successfully!");

      // Reset form
      setForm({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        password: "",
        role: "Staff",
      });

      // Auto clear success message
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      const backendMessage = err.response?.data?.message;

      if (backendMessage === "Email already exists") {
        setMessage("❌ Email already exists. Try another one.");
      } else {
        setMessage("❌ Failed to create user.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <ComponentCard title="Create User" desc="Add a new user to the system.">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="Enter first name"
                hint={errors.firstName ? "First name is required." : ""}
              />
            </div>

            <div>
              <Label>Last Name</Label>
              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Enter last name"
                hint={errors.lastName ? "Last name is required." : ""}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                errors.gender ? "border-red-500" : ""
              }`}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">Gender is required.</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter email"
              hint={errors.email ? "Invalid email format." : ""}
            />
          </div>

          {/* Password */}
          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter password"
              hint={
                errors.password
                  ? "Password must be at least 6 characters."
                  : ""
              }
            />
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option>Admin</option>
              <option>Staff</option>
              <option>Teacher</option>
              <option>Student</option>
            </select>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-center ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </ComponentCard>
    </div>
  );
};

export default CreateUserPage;
