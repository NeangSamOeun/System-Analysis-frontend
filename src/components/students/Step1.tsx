import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnrollmentInterface } from "./EnrollmentInterface";

interface Step1Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
}

export default function Step1({ form, setForm }: Step1Props) {
  return (
    <ComponentCard title="Personal Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>First Name</Label>
          <Input
            placeholder="Enter first name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div>
          <Label>Last Name</Label>
          <Input
            placeholder="Enter last name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>

        <div>
          <Label>Sex</Label>
          <Input
            placeholder="Male / Female"
            value={form.sex}
            onChange={(e) => setForm({ ...form, sex: e.target.value })}
          />
        </div>

        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={form.dob?.split("T")[0] || ""}
            onChange={(e) => setForm({ ...form, dob: e.target.value })}
          />
        </div>

        <div>
          <Label>Nationality</Label>
          <Input
            placeholder="Nationality"
            value={form.nationality}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          />
        </div>

        <div>
          <Label>Telegram</Label>
          <Input
            placeholder="Telegram Username"
            value={form.telegram}
            onChange={(e) => setForm({ ...form, telegram: e.target.value })}
          />
        </div>

        <div>
          <Label>Father Name</Label>
          <Input
            placeholder="Father Name"
            value={form.fatherName}
            onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
          />
        </div>

        <div>
          <Label>Mother Name</Label>
          <Input
            placeholder="Mother Name"
            value={form.motherName}
            onChange={(e) => setForm({ ...form, motherName: e.target.value })}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
