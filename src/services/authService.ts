import API from "../environment/api";

export const login = async (email: string, password: string) => {
  const response = await API.post("/Auth/login", {
    email,
    password,
  });
  return response.data;
};


