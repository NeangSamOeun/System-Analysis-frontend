import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Pagination from "../../common/Pagination";
import ComponentCard from "../../common/ComponentCard";
import PageBreadcrumb from "../../common/PageBreadCrumb";
import { getUser } from "../../../services/userService";
import Badge from "../../ui/badge/Badge";
import {Edit, Trash, Eye  } from "lucide-react"
import { useNavigate } from "react-router";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  role: string;
}

export default function GetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUser(); // ✔ service not changed
      setUsers(response.data.results);
    } catch (err) {
      console.error("Error loading users", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  return (
    <>
      {/* <PageBreadcrumb pageTitle="Users Management" /> */}

      {/* <ComponentCard title="User List"> */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/5 sm:px-6">

          {/* HEADER */}
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Users List
            </h3>

            <button
              onClick={() => navigate("/user-create")}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 
                         text-sm font-medium text-gray-700 shadow hover:bg-gray-50 
                         dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 
                         dark:hover:bg-white/[0.04]"
            >
              + Create User
            </button>
          </div>

          {/* TABLE */}
          <div className="max-w-full overflow-x-auto">
            <Table>
              <TableHeader className="bg-green-500 dark:bg-white/[0.04] border-y border-gray-200 dark:border-gray-800">
                <TableRow>
                  <TableCell className="font-semibold p-1 text-white dark:text-gray-300 py-3">
                    No.
                  </TableCell>

                  <TableCell className="font-semibold text-white dark:text-gray-300 py-3">
                    First Name
                  </TableCell>

                  <TableCell className="font-semibold text-white dark:text-gray-300 py-3">
                    Last Name
                  </TableCell>

                  <TableCell className="font-semibold text-white dark:text-gray-300 py-3">
                    Email
                  </TableCell>

                  <TableCell className="font-semibold text-white dark:text-gray-300 py-3">
                    Gender
                  </TableCell>

                  <TableCell className="font-semibold text-white dark:text-gray-300 py-3">
                    Role
                  </TableCell>

                  <TableCell className="font-semibold text-white dark:text-gray-300 py-3 text-center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {currentUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-6 text-gray-500 dark:text-gray-400"
                    >
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentUsers.map((u, idx) => (
                    <TableRow key={u.id} className=" transition-all hover:bg-gray-50 dark:hover:bg-white/10">
                      <TableCell className="p-1 text-gray-500 dark:text-gray-400">
                        {(currentPage - 1) * itemsPerPage + idx + 1}
                      </TableCell>

                      {/* NAME */}
                      <TableCell className="text-gray-500 dark:text-gray-400">
                        {u.firstName}
                      </TableCell>

                      <TableCell className="text-gray-500 dark:text-gray-400">
                        {u.lastName}
                      </TableCell>

                      <TableCell className="text-gray-500 dark:text-gray-400">
                        {u.email}
                      </TableCell>

                      <TableCell className="text-gray-500 dark:text-gray-400">
                        {u.gender}
                      </TableCell>

                      {/* ROLE WITH BADGE */}
                      <TableCell>
                        <Badge
                          size="sm"
                          color={
                            u.role === "Admin"
                              ? "primary"
                              : u.role === "Staff"
                              ? "warning"
                              : "success"
                          }
                        >
                          {u.role}
                        </Badge>
                      </TableCell>

                      {/* ACTION BUTTONS */}
                      <TableCell>
                        <div className="flex justify-center items-center gap-3">
                          <button
                            className="text-green-500 hover:text-green-600 transition"
                            onClick={() => alert(`Edit user ${u.firstName}`)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600 transition"
                            onClick={() => alert(`Delete user ${u.firstName}`)}
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

          {/* PAGINATION */}
          <Pagination
            totalItems={users.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(size) => {
              setItemsPerPage(size);
              setCurrentPage(1);
            }}
          />
        </div>
      {/* </ComponentCard> */}
    </>
  );
}
