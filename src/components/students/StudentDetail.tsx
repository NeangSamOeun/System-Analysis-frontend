import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Badge from "../ui/badge/Badge";
import { formatDate } from "../dateFormatter/dateFormatter";
import { getStudentDetail } from "../../services/studentService";
import Button from "../ui/button/Button";
import { StudentDetail } from "./StudentInterface";
import {ArrowLeft} from "lucide-react";

export default function EnrollmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<StudentDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetail();
  }, [id]);

  const loadDetail = async () => {
    try {
      const res = await getStudentDetail(id!);
      setData(res.data.results);
    } catch (err) {
      console.error("Error loading student detail", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10 text-gray-500 text-lg">
        Loading...
      </div>
    );

  if (!data)
    return (
      <p className="p-4 text-red-500">No data found for this student.</p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <Button
        onClick={() => navigate(-1)}
        className="mb-6 text-black px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm border"
      >
        <ArrowLeft size={18} />Back
      </Button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-400">
        Student Detail
        <span className="block text-lg text-gray-400 font-normal">
          {data.firstName} {data.lastName}
        </span>
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card Component */}
        <DetailCard title="Basic Information">
          <DetailRow label="Code" value={data.code} />
          <DetailRow label="Gender" value={data.sex} />
          <DetailRow label="Date of Birth" value={formatDate(data.dob)} />
          <DetailRow label="Phone Number" value={data.phoneNumber} />
          <DetailRow label="Telegram" value={data.telegram} />
          <DetailRow label="Nationality" value={data.nationality} />
        </DetailCard>

        <DetailCard title="Education Info">
          <DetailRow label="BAC II Grade" value={data.bacIIGrade} />
          <DetailRow label="Certificate Code" value={data.bacIICertificateCode} />
          <DetailRow label="BAC II Year" value={data.bacIIYear} />
          <DetailRow label="High School" value={data.highSchoolName} />
          <DetailRow label="Location" value={data.highSchoolLocation} />
        </DetailCard>

        <DetailCard title="Address">
          <DetailRow label="Country" value={data.country} />
          <DetailRow label="Province" value={data.province} />
          <DetailRow label="District" value={data.district} />
          <DetailRow label="Commune" value={data.commune} />
          <DetailRow label="Village" value={data.village} />
        </DetailCard>

        <DetailCard title="Family Information">
          <DetailRow label="Father Name" value={data.fatherName} />
          <DetailRow label="Mother Name" value={data.motherName} />
          <DetailRow label="Guardian Number" value={data.guardianNumber} />
        </DetailCard>

        <DetailCard title="Emergency Contact">
          <DetailRow label="Name" value={data.emergencyName} />
          <DetailRow label="Relationship" value={data.relationship} />
          <DetailRow label="Contact" value={data.emergencyContact} />
          <DetailRow label="Workplace" value={data.emergencyWorkplace} />
        </DetailCard>

        <DetailCard title="Academic Info">
          <DetailRow label="Major" value={data.majorName ?? "No Major"} />
          <DetailRow label="Batch" value={data.batch ?? "-"} />
          <div className="flex items-center gap-3 py-[6px]">
            <span className="font-semibold text-gray-600 w-40">Status:</span>
            <Badge color="primary">{data.status ?? "N/A"}</Badge>
          </div>
          <DetailRow label="Register Date" value={formatDate(data.registerDate)} />
        </DetailCard>

      </div>
    </div>
  );
}

/* Reusable Card Component */
function DetailCard({ title, children }: any) {
  return (
    <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/* Reusable Row Component */
function DetailRow({ label, value }: any) {
  return (
    <p className="flex">
      <span className="font-semibold text-gray-600 w-40">{label}:</span>
      <span className="text-gray-800">{value || "-"}</span>
    </p>
  );
}
