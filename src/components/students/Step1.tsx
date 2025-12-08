import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Radio from "../form/input/Radio";
import { EnrollmentInterface } from "./EnrollmentInterface";

interface Step1Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step1({ form, setForm, errors, setErrors }: Step1Props) {
  return (
    <ComponentCard title="Personal Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* FIRST NAME */}
        <div>
          <Label>First Name</Label>
          <Input
            placeholder="Enter first name"
            className={errors.firstName ? "border-red-500" : ""}
            value={form.firstName}
            onChange={(e) => {
              const value = e.target.value;

              if (errors.firstName) {
                setErrors((prev: any) => ({ ...prev, firstName: "" }));
              }

              if (value === "" || /^[A-Za-z]+$/.test(value)) {
                setForm({ ...form, firstName: value });
              }
            }}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <Label>Last Name</Label>
          <Input
            placeholder="Enter last name"
            className={errors.lastName ? "border-red-500" : ""}
            value={form.lastName}
            onChange={(e) => {
              const value = e.target.value;

              if (errors.lastName) {
                setErrors((prev: any) => ({ ...prev, lastName: "" }));
              }

              if (value === "" || /^[A-Za-z]+$/.test(value)) {
                setForm({ ...form, lastName: value });
              }
            }}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>

        {/* SEX */}
        <div>
          <Label>Sex</Label>

          <div
              className={`flex gap-4 mt-2 ${
                errors.sex ? "border border-red-500 p-2 rounded" : ""
              }`}
            >
              {/* Male */}
              <Radio
                id="sex-male"
                name="sex"
                value="Male"
                label="Male"
                checked={form.sex === "Male"}
                onChange={(value) => {
                  setErrors((prev: any) => ({ ...prev, sex: "" }));
                  setForm((prev) => ({ ...prev, sex: value }));
                }}
              />

              {/* Female */}
              <Radio
                id="sex-female"
                name="sex"
                value="Female"
                label="Female"
                checked={form.sex === "Female"}
                onChange={(value) => {
                  setErrors((prev: any) => ({ ...prev, sex: "" }));
                  setForm((prev) => ({ ...prev, sex: value }));
                }}
              />
            </div>

            {errors.sex && (
              <p className="text-red-500 text-sm mt-1">{errors.sex}</p>
            )}
          </div>

        {/* DATE OF BIRTH */}
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            className={errors.dob ? "border-red-500" : ""}
            value={form.dob?.split("T")[0] || ""}
            onChange={(e) => {
              setErrors((prev: any) => ({ ...prev, dob: "" }));
              setForm({ ...form, dob: e.target.value });
            }}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        {/* NATIONALITY */}
        <div>
          <Label>Nationality</Label>
          <Input
            placeholder="Nationality"
            className={errors.nationality ? "border-red-500" : ""}
            value={form.nationality}
            onChange={(e) => {
              setErrors((prev: any) => ({ ...prev, nationality: "" }));
              setForm({ ...form, nationality: e.target.value });
            }}
          />
          {errors.nationality && (
            <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
          )}
        </div>

        {/* TELEGRAM */}
        <div>
          <Label>Telegram</Label>
          <Input
            placeholder="Telegram Username"
            className={errors.telegram ? "border-red-500" : ""}
            value={form.telegram}
            onChange={(e) => {
              setErrors((prev: any) => ({ ...prev, telegram: "" }));
              setForm({ ...form, telegram: e.target.value });
            }}
          />
          {errors.telegram && (
            <p className="text-red-500 text-sm mt-1">{errors.telegram}</p>
          )}
        </div>

        {/* FATHER NAME */}
        <div>
          <Label>Father Name</Label>
          <Input
            placeholder="Father Name"
            className={errors.fatherName ? "border-red-500" : ""}
            value={form.fatherName}
            onChange={(e) => {
              const value = e.target.value;
              if (errors.fatherName) {
                setErrors((prev: any) => ({ ...prev, fatherName: "" }));
              }
              if (value === "" || /^[A-Za-z\s]+$/.test(value)) {
                setForm({ ...form, fatherName: value });
              }
            }}
          />
          {errors.fatherName && (
            <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>
          )}
        </div>

        {/* MOTHER NAME */}
        <div>
          <Label>Mother Name</Label>
          <Input
            placeholder="Mother Name"
            className={errors.motherName ? "border-red-500" : ""}
            value={form.motherName}
            onChange={(e) => {
              const value = e.target.value;
              if (errors.motherName) {
                setErrors((prev: any) => ({ ...prev, motherName: "" }));
              }
              if (value === "" || /^[A-Za-z\s]+$/.test(value)) {
                setForm({ ...form, motherName: value });
              }
            }}
          />
          {errors.motherName && (
            <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>
          )}
        </div>

      </div>
    </ComponentCard>
  );
}
