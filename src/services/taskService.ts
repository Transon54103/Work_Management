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
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
const taskService = {
  getTasks: () => authApi.get("/TaskWork"),
  updateTask: (data: any) => authApi.put(`/TaskWork`, data),
};

export default taskService;
