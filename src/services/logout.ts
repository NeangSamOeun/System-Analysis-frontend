export function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  sessionStorage.removeItem("otp-email");
}