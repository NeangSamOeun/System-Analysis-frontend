import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnrollmentInterface } from "./EnrollmentInterface";

interface Step2Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
}

export default function Step2({ form, setForm }: Step2Props) {
  return (
    <ComponentCard title="Education Background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <Label>Education</Label>
          <Input
            value={form.education}
            onChange={(e) => setForm({ ...form, education: e.target.value })}
            placeholder="High School / BacII"
          />
        </div>

        <div>
          <Label>BacII Grade</Label>
          <Input
            value={form.bacIIGrade}
            onChange={(e) => setForm({ ...form, bacIIGrade: e.target.value })}
            placeholder="A / B / C / D"
          />
        </div>

        <div>
          <Label>BacII Certificate Code</Label>
          <Input
            value={form.bacIICertificateCode}
            onChange={(e) =>
              setForm({ ...form, bacIICertificateCode: e.target.value })
            }
            placeholder="Code"
          />
        </div>

        <div>
          <Label>BacII Year</Label>
          <Input
            type="number"
            value={form.bacIIYear}
            onChange={(e) =>
              setForm({ ...form, bacIIYear: Number(e.target.value) })
            }
          />
        </div>

        <div>
          <Label>High School Name</Label>
          <Input
            value={form.highSchoolName}
            onChange={(e) =>
              setForm({ ...form, highSchoolName: e.target.value })
            }
          />
        </div>

        <div>
          <Label>High School Location</Label>
          <Input
            value={form.highSchoolLocation}
            onChange={(e) =>
              setForm({ ...form, highSchoolLocation: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Career Type</Label>
          <Input
            value={form.careerType}
            onChange={(e) =>
              setForm({ ...form, careerType: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Academic Unit</Label>
          <Input
            value={form.academicUnit}
            onChange={(e) =>
              setForm({ ...form, academicUnit: e.target.value })
            }
          />
        </div>

      </div>
    </ComponentCard>
  );
}
