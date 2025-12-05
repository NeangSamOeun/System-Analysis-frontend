import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import PageBreadcrumb from "../common/PageBreadCrumb";
import { EnrollmentInterface, defaultEnrollment } from "./EnrollmentInterface";
import Alert from "../ui/alert/Alert";
import { useNavigate } from "react-router";

const StudentEnrollmentForm = () => {
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

  const next = () => setStep((s) => Math.min(s + 1, 5));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
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

        {step === 1 && <Step1 form={form} setForm={setForm} />}
        {step === 2 && <Step2 form={form} setForm={setForm} />}
        {step === 3 && <Step3 form={form} setForm={setForm} />}
        {step === 4 && <Step4 form={form} setForm={setForm} />}
        {step === 5 && <Step5 form={form} setForm={setForm} />}

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

