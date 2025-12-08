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

interface Step5Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
}

export default function Step5({ form, setForm }: Step5Props) {
  const [options, setOptions] = useState<Option[]>([]);

  // Load major list
useEffect(() => {
  fetch("https://localhost:7016/api/Majors")
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.results.map((m: Major) => ({
        value: m.majorId.toString(),  // string
        label: m.majorName,
      }));
      setOptions(formatted);
    });
}, []);


  // Handle change when user selects major
  const handleSelectChange = (value: string) => {
  setForm({ ...form, majorId: Number(value) });
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
        </div>

        {/* Student Code */}
        <div>
          <Label>Student Code</Label>
          <Input
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
        </div>

        {/* Register Date */}
        <div>
          <Label>Register Date</Label>
          <Input
            type="date"
            value={form.registerDate?.split("T")[0] || ""}
            onChange={(e) =>
              setForm({ ...form, registerDate: e.target.value })
            }
          />
        </div>

        {/* Register Type */}
        <div>
          <Label>Register Type</Label>
          <Input
            value={form.registerType}
            onChange={(e) =>
              setForm({ ...form, registerType: e.target.value })
            }
          />
        </div>

        {/* Status */}
        <div>
          <Label>Status</Label>
          <Select
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Approved", label: "Approved" },
              { value: "Rejected", label: "Rejected" },
            ]}
            placeholder="Select Status"
            value={form.status}
            onChange={(value) => setForm({ ...form, status: value })}
            className="dark:bg-dark-900"
          />
        </div>

        {/* batch */}
        <div>
          <Label>Batch</Label>
          <Input
            value={form.batch}
            onChange={(e) => setForm({ ...form, batch: e.target.value })}
          />
        </div>

      </div>
    </ComponentCard>
  );
}
