import axios from "axios";

// Create a separate axios instance for auth to avoid network logs
const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7058/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// Simple interceptor for auth API - no logging
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just pass through errors without logging for auth requests
    return Promise.reject(error);
  }
);

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    authApi.post("/User/login", credentials),

  register: (data: { name: string; email: string; password: string }) =>
    authApi.post("/User/register", data),

  logout: () => authApi.post("/auth/logout"),

  refreshToken: (refreshToken: string) =>
    authApi.post("/User/refresh", { refreshToken }),

  getProfile: () => authApi.get("/auth/profile"),
};
