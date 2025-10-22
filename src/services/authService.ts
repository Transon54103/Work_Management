import api from "../utils/api";

export const authService = {
  login: (credentials: { email: string; password: string }) =>
    api.post("/auth/login", credentials),

  register: (data: { name: string; email: string; password: string }) =>
    api.post("/auth/register", data),

  logout: () => api.post("/auth/logout"),

  refreshToken: (refreshToken: string) =>
    api.post("/auth/refresh", { refresh_token: refreshToken }),

  getProfile: () => api.get("/auth/profile"),
};
