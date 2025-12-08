import { useState } from "react";
import { createMajor } from "../../services/majorService";
import Label from "../form/Label";
import Input from "../form/input/InputField";

export default function CreateMajor() {
  const [majorName, setMajorName] = useState("");
  const [errors, setErrors] = useState<{ majorName?: string }>({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Validation
    if (!majorName.trim()) {
      setErrors({ majorName: "Major name is required." });
      return;
    }

    try {
      await createMajor(majorName);
      alert("Major created successfully!");
      setMajorName(""); // Reset field
      setErrors({});
    } catch (err) {
      console.error(err);
      alert("Failed to create major.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Create Major</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Major Name */}
        <div>
          <Label>Major Name</Label>
          <Input
            name="majorName"
            value={majorName}
            onChange={(e) => setMajorName(e.target.value)}
            placeholder="Enter major name"
            hint={errors.majorName ? errors.majorName : ""}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Major
        </button>
      </form>
    </div>
  );
}
