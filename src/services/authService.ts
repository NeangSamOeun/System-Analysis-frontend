import API from "../environment/api";

export const login = async (username: string, password: string) => {
  const response = await API.post("/Auth/login", {
    username,
    password,
  });
  return response.data;
};
