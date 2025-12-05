import { useEffect, useState } from "react";
import { getMajors, deleteMajor } from "../../services/majorService";
import { Trash, Edit, Eye } from "lucide-react";
import ComponentCard from "../common/ComponentCard";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { Navigate, useNavigate } from "react-router";

interface Major {
  majorId: number;
  majorName: string;
}

export default function GetMajors() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    loadMajors();
  }, []);

  const loadMajors = async () => {
    try {
      const res = await getMajors();
      setMajors(res.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this major?")) return;

    try {
      await deleteMajor(id);
      loadMajors();
    } catch (err) {
      alert("Cannot delete major");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    // <ComponentCard title="Majors List">
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/5 sm:px-6">

          {/* HEADER */}
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Major List
            </h3>
            <button
                onClick={() => navigate("/create-major")} 
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 
                         text-sm font-medium text-gray-700 shadow hover:bg-gray-50 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
                         dark:hover:bg-white/[0.04]">
              + Create User
            </button>
          </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-green-500 dark:bg-white/[0.04] border-y border-gray-200 dark:border-gray-800">
            <TableRow>
              <TableCell className="font-semibold text-white dark:text-gray-300 p-1">
                No.
              </TableCell>
              <TableCell className="font-semibold text-white dark:text-gray-300">
                Major Name
              </TableCell>
              <TableCell className="font-semibold text-white dark:text-gray-300  text-center">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {majors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                  No majors found
                </TableCell>
              </TableRow>
            ) : (
              majors.map((m, idx) => (
                <TableRow key={m.majorId} className="hover:bg-gray-50 dark:hover:bg-white/10">
                  <TableCell className="text-gray-500 dark:text-white/90 p-1">{idx + 1}</TableCell>
                  <TableCell className="text-gray-500 dark:text-white/90">{m.majorName}</TableCell>
                  <TableCell >
                    <div className="flex justify-center items-center gap-3">
                    {/* Detail */}
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => alert(`Details of ${m.majorName}`)}
                    >
                      <Eye size={16} />
                    </button>

                    {/* Edit */}
                    <button
                      className="text-green-500 hover:text-green-600"
                      onClick={() => alert(`Edit ${m.majorName}`)}
                    >
                      <Edit size={16} />
                    </button>

                    {/* Delete */}
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDelete(m.majorId)}
                    >
                      <Trash size={16} />
                    </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      </div>

    // </ComponentCard>
  );
}
