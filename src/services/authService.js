import api from "../api/axios";

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};

// export const resetPassword = async (data) => {
//   const response = await api.post("/auth/reset-password", data);
//   return response.data;
// };

export const verifyRecovery = async (data) => {
  const response = await api.post("/auth/verify-recovery", data);
  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};
