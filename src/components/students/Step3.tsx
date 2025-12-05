import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnrollmentInterface } from "./EnrollmentInterface";

interface Step3Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
}

export default function Step3({ form, setForm }: Step3Props) {
  return (
    <ComponentCard title="Permanent Address">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <Label>Country</Label>
          <Input
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
          />
        </div>

        <div>
          <Label>Province</Label>
          <Input
            value={form.province}
            onChange={(e) => setForm({ ...form, province: e.target.value })}
          />
        </div>

        <div>
          <Label>District</Label>
          <Input
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
          />
        </div>

        <div>
          <Label>Commune</Label>
          <Input
            value={form.commune}
            onChange={(e) => setForm({ ...form, commune: e.target.value })}
          />
        </div>

        <div>
          <Label>Village</Label>
          <Input
            value={form.village}
            onChange={(e) => setForm({ ...form, village: e.target.value })}
          />
        </div>

      </div>
    </ComponentCard>
  );
}
