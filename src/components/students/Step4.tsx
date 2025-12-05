import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnrollmentInterface } from "./EnrollmentInterface";

interface Step4Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
}

export default function Step4({ form, setForm }: Step4Props) {
  return (
    <ComponentCard title="Contact Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <Label>Phone Number</Label>
          <Input
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
        </div>

        <div>
          <Label>Guardian Number</Label>
          <Input
            value={form.guardianNumber}
            onChange={(e) =>
              setForm({ ...form, guardianNumber: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Emergency Name</Label>
          <Input
            value={form.emergencyName}
            onChange={(e) =>
              setForm({ ...form, emergencyName: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Relationship</Label>
          <Input
            value={form.relationship}
            onChange={(e) =>
              setForm({ ...form, relationship: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Emergency Contact</Label>
          <Input
            value={form.emergencyContact}
            onChange={(e) =>
              setForm({ ...form, emergencyContact: e.target.value })
            }
          />
        </div>

        <div>
          <Label>Emergency Workplace</Label>
          <Input
            value={form.emergencyWorkplace}
            onChange={(e) =>
              setForm({ ...form, emergencyWorkplace: e.target.value })
            }
          />
        </div>

      </div>
    </ComponentCard>
  );
}
