import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import { EnrollmentInterface } from "./EnrollmentInterface";
import { useState } from "react"; // If you need it, but here you actually don't.

interface Step2Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step2({ form, setForm, errors, setErrors }: Step2Props) {

  const handleChange = (field: keyof EnrollmentInterface, value: any) => {
    setForm({ ...form, [field]: value });

    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const educationOptions = [
    { value: "highschool", label: "High School" },
    { value: "bachelor", label: "Bachelor Degree" },
    { value: "master", label: "Master Degree" },
  ];

  const bacIIGradeOptions = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
    { value: "D", label: "D" },
    { value: "E", label: "E" },
  ];

  return (
    <ComponentCard title="Education Background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* EDUCATION */}
        <div>
          <Label>Education</Label>
          <Select
            options={educationOptions}
            placeholder="Select education"
            defaultValue={form.education}                  // ✅ Correct
            onChange={(val) => handleChange("education", val)}
            className={errors.education ? "border-red-500" : ""}
          />
          {errors.education && (
            <p className="text-red-500 text-sm mt-1">{errors.education}</p>
          )}
        </div>

        {/* BACII GRADE */}
        <div>
          <Label>BacII Grade</Label>
          <Select
            options={bacIIGradeOptions}
            placeholder="Select grade"
            defaultValue={form.bacIIGrade}                 // ✅ Correct
            onChange={(value) => handleChange("bacIIGrade", value)}
            className={errors.bacIIGrade ? "border-red-500" : ""}
          />
          {errors.bacIIGrade && (
            <p className="text-red-500 text-sm mt-1">{errors.bacIIGrade}</p>
          )}
        </div>

        {/* BACII CERTIFICATE CODE */}
        <div>
          <Label>BacII Certificate Code</Label>
          <Input
            value={form.bacIICertificateCode}
            onChange={(e) =>
              handleChange("bacIICertificateCode", e.target.value)
            }
            placeholder="Code"
            className={errors.bacIICertificateCode ? "border-red-500" : ""}
          />
          {errors.bacIICertificateCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bacIICertificateCode}
            </p>
          )}
        </div>

        {/* BACII YEAR */}
        <div>
          <Label>BacII Year</Label>
          <Input
            type="number"
            value={form.bacIIYear || ""}
            onChange={(e) =>
              handleChange("bacIIYear", e.target.value ? Number(e.target.value) : "")
            }
            className={errors.bacIIYear ? "border-red-500" : ""}
          />
          {errors.bacIIYear && (
            <p className="text-red-500 text-sm mt-1">{errors.bacIIYear}</p>
          )}
        </div>

        {/* HIGH SCHOOL NAME */}
        <div>
          <Label>High School Name</Label>
          <Input
            value={form.highSchoolName}
            onChange={(e) => handleChange("highSchoolName", e.target.value)}
            className={errors.highSchoolName ? "border-red-500" : ""}
          />
          {errors.highSchoolName && (
            <p className="text-red-500 text-sm mt-1">{errors.highSchoolName}</p>
          )}
        </div>

        {/* HIGH SCHOOL LOCATION */}
        <div>
          <Label>High School Location</Label>
          <Input
            value={form.highSchoolLocation}
            onChange={(e) => handleChange("highSchoolLocation", e.target.value)}
            className={errors.highSchoolLocation ? "border-red-500" : ""}
          />
          {errors.highSchoolLocation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.highSchoolLocation}
            </p>
          )}
        </div>

        {/* CAREER TYPE */}
        <div>
          <Label>Career Type</Label>
          <Input
            value={form.careerType}
            onChange={(e) => handleChange("careerType", e.target.value)}
            className={errors.careerType ? "border-red-500" : ""}
          />
          {errors.careerType && (
            <p className="text-red-500 text-sm mt-1">{errors.careerType}</p>
          )}
        </div>

        {/* ACADEMIC UNIT */}
        <div>
          <Label>Academic Unit</Label>
          <Input
            value={form.academicUnit}
            onChange={(e) => handleChange("academicUnit", e.target.value)}
            className={errors.academicUnit ? "border-red-500" : ""}
          />
          {errors.academicUnit && (
            <p className="text-red-500 text-sm mt-1">{errors.academicUnit}</p>
          )}
        </div>
      </div>
    </ComponentCard>
  );
}
