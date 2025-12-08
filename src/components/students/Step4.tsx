import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import PhoneInput from "../form/group-input/PhoneInput";
import { EnrollmentInterface } from "./EnrollmentInterface";

// Properly typed errors for Step4
interface Step4Errors {
  phoneNumber?: string;
  guardianNumber?: string;
  emergencyName?: string;
  relationship?: string;
  emergencyContact?: string;
  emergencyWorkplace?: string;
}

interface Step4Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
  errors: Step4Errors;
  setErrors: React.Dispatch<React.SetStateAction<Step4Errors>>;
}

// Utility function for phone validation
export function validatePhone(phone: string) {
  if (!phone || phone.trim() === "") return "Phone number is required";

  // Must not contain letters
  if (/[a-zA-Z]/.test(phone)) return "Phone number cannot contain letters";

  // Remove everything except digits and +
  const cleaned = phone.replace(/[^0-9+]/g, "");
  if (!cleaned.startsWith("+")) return "Invalid phone format";

  const digits = cleaned.replace(/\D/g, "");
  if (digits.length < 8) return "Phone number must contain at least 8 digits";

  return "";
}

// Utility function for name validation (no numbers allowed)
export function validateName(name: string) {
  if (!name || name.trim() === "") return "This field is required";
  if (/\d/.test(name)) return "Cannot contain numbers";
  return "";
}

export default function Step4({ form, setForm, errors, setErrors }: Step4Props) {
  const countries = [
    { code: "KH", label: "+855" },
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
    { code: "CA", label: "+1" },
    { code: "AU", label: "+61" },
  ];

  const handleChange = (field: keyof EnrollmentInterface, value: string) => {
    // Only allow numbers and + at the start for phone fields
    if (field === "phoneNumber" || field === "guardianNumber" || field === "emergencyContact") {
      let filtered = value
        .split("")
        .filter((char, index) => {
          if (char >= "0" && char <= "9") return true;
          if (char === "+" && index === 0) return true;
          return false;
        })
        .join("");
      value = filtered;
    }

    // Remove numbers from emergencyName and relationship
    if (field === "emergencyName" || field === "relationship") {
      value = value.replace(/[0-9]/g, "");
    }

    setForm({ ...form, [field]: value });

    // Clear the error for this field immediately
    if (errors[field as keyof Step4Errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    // Apply live validation
    if (field === "phoneNumber" || field === "guardianNumber" || field === "emergencyContact") {
      const errorMsg = validatePhone(value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }

    if (field === "emergencyName" || field === "relationship") {
      const errorMsg = validateName(value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  return (
    <ComponentCard title="Contact Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* PHONE NUMBER */}
        <div>
          <Label>Phone Number</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+855 (XXX) XXX-XXXX"
            value={form.phoneNumber}
            onChange={(value) => handleChange("phoneNumber", value)}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
        </div>

        {/* GUARDIAN NUMBER */}
        <div>
          <Label>Guardian Number</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            value={form.guardianNumber}
            onChange={(value) => handleChange("guardianNumber", value)}
          />
          {errors.guardianNumber && <p className="text-red-500 text-sm mt-1">{errors.guardianNumber}</p>}
        </div>

        {/* EMERGENCY NAME */}
        <div>
          <Label>Emergency Name</Label>
          <Input
            value={form.emergencyName}
            onChange={(e) => handleChange("emergencyName", e.target.value)}
            className={errors.emergencyName ? "border-red-500" : ""}
          />
          {errors.emergencyName && <p className="text-red-500 text-sm mt-1">{errors.emergencyName}</p>}
        </div>

        {/* RELATIONSHIP */}
        <div>
          <Label>Relationship</Label>
          <Input
            value={form.relationship}
            onChange={(e) => handleChange("relationship", e.target.value)}
            className={errors.relationship ? "border-red-500" : ""}
          />
          {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>}
        </div>

        {/* EMERGENCY CONTACT */}
        <div>
          <Label>Emergency Contact</Label>
          <PhoneInput
            selectPosition="start"
            countries={countries}
            placeholder="+855 (XXX) XXX-XXXX"
            value={form.emergencyContact}
            onChange={(value) => handleChange("emergencyContact", value)}
          />
          {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
        </div>

        {/* EMERGENCY WORKPLACE */}
        <div>
          <Label>Emergency Workplace</Label>
          <Input
            value={form.emergencyWorkplace}
            onChange={(e) => handleChange("emergencyWorkplace", e.target.value)}
            className={errors.emergencyWorkplace ? "border-red-500" : ""}
          />
          {errors.emergencyWorkplace && <p className="text-red-500 text-sm mt-1">{errors.emergencyWorkplace}</p>}
        </div>

      </div>
    </ComponentCard>
  );
}
