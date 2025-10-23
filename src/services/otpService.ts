import API from "../environment/api";

export const verify = async(otpCode: number) =>{
    const response = await API.post("/Auth/verify-otp",{
        otpCode
    });
    return response.data;
};