import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { validatePhone } from "./Step4";
import Step5 from "./Step5";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { EnrollmentInterface, defaultEnrollment } from "./EnrollmentInterface";
import Alert from "../ui/alert/Alert";
import { useNavigate } from "react-router";


const StudentEnrollmentForm = () => {

  const [errors, setErrors] = useState<any>({});
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<EnrollmentInterface>(defaultEnrollment);
  const navigate = useNavigate();

  const [alert, setAlert] = useState<{
    type: "success" | "error" | "warning" | "info";
    title: string;
    message: string;
  } | null>(null);

  const showAlert = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    message: string
  ) => {
    setAlert({ type, title, message });

    // Auto close after 4s
    setTimeout(() => setAlert(null), 4000);
  };

  
  const next = () => {
    const newErrors: any = {};

    // STEP 1 VALIDATION
    if (step === 1) {
      if (!form.firstName) newErrors.firstName = "First name is required";
      if (!form.lastName) newErrors.lastName = "Last name is required";
      if (!form.sex) newErrors.sex = "Sex is required";
      if (!form.dob) newErrors.dob = "Date of birth is required";
      if (!form.nationality) newErrors.nationality = "Nationality is required";
      if (!form.telegram) newErrors.telegram = "Telegram is required";
      if (!form.fatherName) newErrors.fatherName = "Father name is required";
      if (!form.motherName) newErrors.motherName = "Mother name is required";
    }

    // STEP 2 VALIDATION
    if (step === 2) {
      if (!form.education) newErrors.education = "Education is required";
      if (!form.bacIIGrade) newErrors.bacIIGrade = "BacII grade is required";
      if (!form.bacIICertificateCode) newErrors.bacIICertificateCode = "Certificate code is required";
      if (!form.bacIIYear) newErrors.bacIIYear = "BacII year is required";
      if (!form.highSchoolName) newErrors.highSchoolName = "High school name is required";
      if (!form.highSchoolLocation) newErrors.highSchoolLocation = "High school location is required";
      if (!form.careerType) newErrors.careerType = "Career type is required";
      if (!form.academicUnit) newErrors.academicUnit = "Academic unit is required";
    }

    // STEP 3 VALIDATION
    if (step === 3) {
      const newErrors: any = {};
      if (!form.country) newErrors.country = "Country is required";
      if (!form.province) newErrors.province = "Province is required";
      if (!form.district) newErrors.district = "District is required";
      if (!form.commune) newErrors.commune = "Commune is required";
      if (!form.village) newErrors.village = "Village is required";

        setErrors(newErrors);
      // IF ERRORS > STOP
      if (Object.keys(newErrors).length > 0) {
        showAlert("error", "Missing Information", "Please fill all required fields.");
        return;
      }
    }

    // STEP 4 VALIDATION
    if (step === 4) {
      const phoneError = validatePhone(form.phoneNumber);
      const guardianError = validatePhone(form.guardianNumber);
      const emergencyError = validatePhone(form.emergencyContact);

      if (phoneError) newErrors.phoneNumber = phoneError;
      if (guardianError) newErrors.guardianNumber = guardianError;
      if (emergencyError) newErrors.emergencyContact = emergencyError;

      if (!form.emergencyName) newErrors.emergencyName = "Emergency name is required";
      if (!form.relationship) newErrors.relationship = "Relationship is required";
      if (!form.emergencyWorkplace) newErrors.emergencyWorkplace = "Emergency workplace is required";
    }

    setErrors(newErrors);
      // IF ERRORS > STOP
      if (Object.keys(newErrors).length > 0) {
        showAlert("error", "Missing Information", "Please fill all required fields.");
        return;
      }
    // No errors → go next
    setStep((s) => Math.min(s + 1, 5));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    // STEP 5 VALIDATION (final step)
    const newErrors: any = {};

    // Major
    if (!form.majorId) newErrors.majorId = "Major is required";

    // Student Code
    if (!form.code) newErrors.code = "Student code is required";
    else if (/\D/.test(form.code)) newErrors.code = "Student code must be a number";

    // Register Date
    if (!form.registerDate) newErrors.registerDate = "Register date is required";

    // Register Type
    if (!form.registerType) newErrors.registerType = "Register type is required";

    // Status
    if (!form.status) newErrors.status = "Status is required";

    // Batch
    if (!form.batch) newErrors.batch = "Batch is required";
    else if (/\D/.test(form.batch)) newErrors.batch = "Batch must be a number";

    setErrors(newErrors);

    // IF ERRORS > STOP
    if (Object.keys(newErrors).length > 0) {
      showAlert("error", "Missing Information", "Please fill all required fields.");
      return;
    }

    // No errors → proceed with submit
    try {
      const res = await fetch("https://localhost:7016/api/Enrollment/enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const title = data?.title || "Error";
        const message = data?.message || data?.error || "Unknown error occurred.";
        showAlert("error", title, message);
        return;
      }

      showAlert("success", "Success", "Enrollment submitted successfully!");
      setTimeout(() => {
        navigate("/student-list");
      }, 1000);
    } catch (err: any) {
      showAlert("error", "Network Error", err.message || "Please try again.");
    }
  };

  return (
    <>
      {alert && (
        <Alert variant={alert.type} title={alert.title} message={alert.message} />
      )}

      <div className="mx-auto">
        <PageBreadcrumb pageTitle="Users Management" />

        {step === 1 && <Step1 form={form} setForm={setForm} errors={errors} setErrors={setErrors} />}
        {step === 2 && <Step2 form={form} setForm={setForm} errors={errors} setErrors={setErrors} />}
        {step === 3 && <Step3 form={form} setForm={setForm} errors={errors} setErrors={setErrors} />}
        {step === 4 && <Step4 form={form} setForm={setForm} errors={errors} setErrors={setErrors} />}
        {step === 5 && <Step5 form={form} setForm={setForm} errors={errors} setErrors={setErrors} />}

        <div className="mt-8 flex justify-end gap-4">
          {step > 1 && (
            <button
              onClick={prev}
              className="px-8 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 -skew-x-12"
            >
              PREV
            </button>
          )}

          {step < 5 && (
            <button
              onClick={next}
              className="px-8 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700​​ -skew-x-12"
            >
              NEXT
            </button>
          )}

          {step === 5 && (
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 -skew-x-12"
            >
              SUBMIT
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentEnrollmentForm;

