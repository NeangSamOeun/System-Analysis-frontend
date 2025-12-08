import { useEffect, useState } from "react";
import { Edit, Trash, Eye, Search, RefreshCcw } from "lucide-react";
import { deleteStudent, getStudents, queryList } from "../../services/studentService";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Pagination from "../common/Pagination";
import Badge from "../ui/badge/Badge";
import { formatDate } from "../dateFormatter/dateFormatter";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import useBaseRefresh from "../../hooks/useBaseRefresh";
import DeleteModal from "../ui/modal/DeleteModal";

interface Student {
  studentId: string;
  code: string;
  firstName: string;
  lastName: string;
  sex: string;
  dob: string | null;
  phoneNumber: string | null;
  registerDate: string | null;
  major: string | null;
  status: string | null;
  bacIIYear: number | null;
  batch: any;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const navigate = useNavigate();

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    search,
    setSearch,
    loading,
    setLoading,
    refresh,
  } = useBaseRefresh(10);

  // Load students when page, pageSize, or search changes
  useEffect(() => {
    loadStudents();
  }, [currentPage, itemsPerPage]);
  
  const loadStudents = async () => {
    try {
      const res = search.trim()
        ? await queryList(currentPage, itemsPerPage, search)
        : await getStudents(currentPage, itemsPerPage);

      setStudents(res.data.items);
      setTotalRecords(res.data.totalRecords);
    } catch (err) {
      console.error("Error loading students", err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    setCurrentPage(1);
    loadStudents();
  };

  const handleConfirmDelete = async () => {
  if (!selectedId) return;

  try {
    setLoading(true);
    await deleteStudent(selectedId);
    refresh(loadStudents);
  } catch (error) {
    console.error(error);
    alert("Failed to delete student");
  } finally {
    setSelectedId(null);
    setSelectedCode(null);
    setDeleteModalOpen(false);
    setLoading(false);
  }
};
  if (loading) return <Loader />;

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/5 sm:px-6">
        {/* HEADER */}
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Students List
            </h3>
            <div className="flex gap-2 items-center">
              {/* Search Box */}
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search student..."
                className="px-3 py-2 text-sm rounded-lg border border-gray-300 
                          focus:ring-green-500 
                          dark:bg-gray-800 dark:text-white dark:border-gray-700 w-9 sm:w-60"/>
              <Button 
                onClick={handleSearch}
                className="inline-flex items-center justify-center gap-2 
                          rounded-lg bg-green-500 px-4 py-2.5 
                          text-white shadow 
                          hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700">
                <Search size={16}/>Search
              </Button>
              {/* Create Button */}
              <Button
                onClick={() => navigate("/enroll")}
                className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 
                          text-white shadow hover:bg-green-600 
                          dark:bg-green-600 dark:hover:bg-green-700">
                + Create Student
              </Button>
              {/* Refresh Button */}
              <Button
                onClick={() => refresh(loadStudents)}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 
                          text-white shadow bg-gray-500 hover:bg-green-600
                          dark:bg-green-600 dark:hover:bg-green-700">
                <RefreshCcw size={16}/>Refresh
              </Button>
            </div>
          </div>
        {/* TABLE */}
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-green-500 dark:bg-gray-400 border-y border-gray-200 dark:border-gray-800">
              <TableRow>
                <TableCell className="font-semibold pl-2 text-white py-3">No.</TableCell>
                <TableCell className="font-semibold text-white py-3">Code</TableCell>
                <TableCell className="font-semibold text-white py-3">First Name</TableCell>
                <TableCell className="font-semibold text-white py-3">Last Name</TableCell>
                <TableCell className="font-semibold text-white py-3">Gender</TableCell>
                <TableCell className="font-semibold text-white py-3">Phone</TableCell>
                <TableCell className="font-semibold text-white py-3">Date of Birth</TableCell>
                <TableCell className="font-semibold text-white py-3">Register Date</TableCell>
                <TableCell className="font-semibold text-white py-3">Major</TableCell>
                <TableCell className="font-semibold text-white py-3">Batch</TableCell>
                <TableCell className="font-semibold text-white py-3">Status</TableCell>
                <TableCell className="font-semibold text-white py-3 text-center">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((s, idx) => (
                  <TableRow key={s.studentId} className="transition-all hover:bg-gray-50 dark:hover:bg-white/10">
                    <TableCell className="pl-2 text-gray-500 dark:text-gray-400">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{s.code}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{s.firstName}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{s.lastName}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{s.sex}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{s.phoneNumber ?? "-"}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{formatDate(s.dob)}</TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{formatDate(s.registerDate)}</TableCell>
                    <TableCell><Badge color="primary"> {s.major ?? "N/A"}</Badge></TableCell>
                    <TableCell className="text-gray-500 dark:text-gray-400">{s.batch ?? "-"}</TableCell>
                    <TableCell><Badge color={
                      s.status === "Approved"
                          ? "success"
                          : s.status === "Active"
                          ? "success"
                          : s.status === "Pending"
                          ? "warning"
                          : s.status === "Rejected"
                          ? "error"
                          : "light"
                    }  >{s.status ?? "-"}</Badge></TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center gap-3">
                        <button className="text-blue-500 hover:text-blue-600 transition"
                          onClick={() => navigate(`/Enrollment/detail/${s.studentId}`)}>
                          <Eye size={16} />
                        </button>
                        <button className="text-green-500 hover:text-green-600 transition"
                          onClick={() => alert(`Edit student ${s.code}`)}>
                          <Edit size={16} />
                        </button>
                        <button className="text-red-500 hover:text-red-600 transition"
                           onClick={() => {
                            setSelectedId(s.studentId);
                            setSelectedCode(s.code);
                            setDeleteModalOpen(true);
                          }}>
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
        {/* PAGINATION FIXED */}
        <Pagination
          totalItems={totalRecords}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(size) => {
            setItemsPerPage(size);
            setCurrentPage(1);
          }}
        />

      <DeleteModal
        isOpen={deleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
        studentCode={selectedCode || ""}
        onConfirm={handleConfirmDelete}
        />
        </div>

    </>
  );
};

export default StudentList;
