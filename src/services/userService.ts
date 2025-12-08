import API from "../environment/api";

export const getUser = async () =>{
    const response = await API.get("Users");
    return response;
}