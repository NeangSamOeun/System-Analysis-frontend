import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnrollmentInterface } from "./EnrollmentInterface";
import Select from "../form/Select";

interface Major {
  majorId: number;
  majorName: string;
}

// Select expects: value: string, label: string
interface Option {
  value: string;
  label: string;
}

interface Step5Errors {
  majorId?: string;
  code?: string;
  registerDate?: string;
  registerType?: string;
  status?: string;
  batch?: string;
}

interface Step5Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
  errors: Step5Errors;
  setErrors: React.Dispatch<React.SetStateAction<Step5Errors>>;
}

export default function Step5({ form, setForm, errors, setErrors }: Step5Props) {
  const [options, setOptions] = useState<Option[]>([]);

  // Load major list
  useEffect(() => {
    fetch("https://localhost:7016/api/Majors")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((m: Major) => ({
          value: m.majorId.toString(),
          label: m.majorName,
        }));
        setOptions(formatted);
      });
  }, []);

  // Handle change when user selects major
  const handleSelectChange = (value: string) => {
    setForm({ ...form, majorId: Number(value) });
    setErrors((prev) => ({ ...prev, majorId: value ? "" : "Major is required" }));
  };

  // Only allow numbers for student code and batch
  const handleNumberInput = (field: "code" | "batch", value: string) => {
    const filtered = value.replace(/\D/g, ""); // Remove non-numeric
    setForm({ ...form, [field]: filtered });

    // Validate live
    if (!filtered) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${field === "code" ? "Student code" : "Batch"} is required`,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle general text input with required validation
  const handleTextInput = (field: "registerDate" | "registerType" | "status", value: string) => {
    setForm({ ...form, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: value ? "" : `${field} is required` }));
  };

  return (
    <ComponentCard title="Register Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Select Major */}
        <div>
          <Label>Major</Label>
          <Select
            options={options}
            placeholder="Select Major"
            value={form.majorId ? form.majorId.toString() : ""}
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
          {errors.majorId && <p className="text-red-500 text-sm mt-1">{errors.majorId}</p>}
        </div>

        {/* Student Code */}
        <div>
          <Label>Student Code</Label>
          <Input
            value={form.code}
            onChange={(e) => handleNumberInput("code", e.target.value)}
            className={errors.code ? "border-red-500" : ""}
          />
          {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
        </div>

        {/* Register Date */}
        <div>
          <Label>Register Date</Label>
          <Input
            type="date"
            value={form.registerDate?.split("T")[0] || ""}
            onChange={(e) => handleTextInput("registerDate", e.target.value)}
            className={errors.registerDate ? "border-red-500" : ""}
          />
          {errors.registerDate && <p className="text-red-500 text-sm mt-1">{errors.registerDate}</p>}
        </div>

        {/* Register Type */}
        <div>
          <Label>Register Type</Label>
          <Input
            value={form.registerType}
            onChange={(e) => handleTextInput("registerType", e.target.value)}
            className={errors.registerType ? "border-red-500" : ""}
          />
          {errors.registerType && <p className="text-red-500 text-sm mt-1">{errors.registerType}</p>}
        </div>

        {/* Status */}
        <div>
          <Label>Status</Label>
          <Input
            value={form.status}
            onChange={(e) => handleTextInput("status", e.target.value)}
            className={errors.status ? "border-red-500" : ""}
          />
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>

        {/* Batch */}
        <div>
          <Label>Batch</Label>
          <Input
            value={form.batch}
            onChange={(e) => handleNumberInput("batch", e.target.value)}
            className={errors.batch ? "border-red-500" : ""}
          />
          {errors.batch && <p className="text-red-500 text-sm mt-1">{errors.batch}</p>}
        </div>

      </div>
    </ComponentCard>
  );
}
