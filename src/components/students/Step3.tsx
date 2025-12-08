import ComponentCard from "../common/ComponentCard";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { EnrollmentInterface } from "./EnrollmentInterface";

interface Step3Props {
  form: EnrollmentInterface;
  setForm: React.Dispatch<React.SetStateAction<EnrollmentInterface>>;
  errors: any;
  setErrors: React.Dispatch<React.SetStateAction<any>>;
}

export default function Step3({ form, setForm, errors, setErrors }: Step3Props) {

  const handleChange = (field: keyof EnrollmentInterface, value: any) => {
    setForm({ ...form, [field]: value });

    // Clear the error for this field immediately
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <ComponentCard title="Permanent Address">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <Label>Country</Label>
          <Input
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className={errors.country ? "border-red-500" : ""}
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        <div>
          <Label>Province</Label>
          <Input
            value={form.province}
            onChange={(e) => handleChange("province", e.target.value)}
            className={errors.province ? "border-red-500" : ""}
          />
          {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
        </div>

        <div>
          <Label>District</Label>
          <Input
            value={form.district}
            onChange={(e) => handleChange("district", e.target.value)}
            className={errors.district ? "border-red-500" : ""}
          />
          {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
        </div>

        <div>
          <Label>Commune</Label>
          <Input
            value={form.commune}
            onChange={(e) => handleChange("commune", e.target.value)}
            className={errors.commune ? "border-red-500" : ""}
          />
          {errors.commune && <p className="text-red-500 text-sm mt-1">{errors.commune}</p>}
        </div>

        <div>
          <Label>Village</Label>
          <Input
            value={form.village}
            onChange={(e) => handleChange("village", e.target.value)}
            className={errors.village ? "border-red-500" : ""}
          />
          {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
        </div>

      </div>
    </ComponentCard>
  );
}
