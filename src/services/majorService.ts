import axios from "axios";

const API = "https://localhost:7016/api/Majors";

export const getMajors = () => axios.get(API);

export const createMajor = (majorName: string) =>
  axios.post(API, { majorName });

export const deleteMajor = (id: number) =>
  axios.delete(`${API}/${id}`);
