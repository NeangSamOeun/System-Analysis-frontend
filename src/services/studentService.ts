import api from "../environment/api";

export async function getStudents(page: number, pageSize: number) {
  return await api.get(`/Enrollment/list`, {
    params: { page, pageSize },
  });
}

export async function getStudentDetail(id: string) {
  return await api.get(`/Enrollment/detail/${id}`);
}

export async function queryList(page: number, pageSize: number, search: string){
  return await api.get(`/Enrollment/list`, {
    params : {page, pageSize, search}
  });
}

export async function deleteStudent(studentId: string) {
  return await api.delete(`/Enrollment/${studentId}`);
}



export async function updateStatus(payload: { studentId: string; status: string }) {
  return await api.patch(`/Enrollment/update-status`, payload);
}

