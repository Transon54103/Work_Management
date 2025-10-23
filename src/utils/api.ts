import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7058/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry and other errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different types of errors
    if (error.code === "ECONNREFUSED") {
      console.error("API server is not running or not accessible");
      throw new Error(
        "Unable to connect to server. Please check if the API server is running."
      );
    }

    if (
      error.code === "ERR_CERT_AUTHORITY_INVALID" ||
      error.code === "CERT_HAS_EXPIRED"
    ) {
      console.error(
        "SSL Certificate issue. For development, you may need to accept the certificate."
      );
      throw new Error(
        "SSL Certificate issue. Please accept the certificate in your browser first."
      );
    }

    if (error.response?.status === 401) {
      // Token expired or invalid - clean up all auth data
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }

    if (error.response?.status === 400) {
      // Bad request - validation errors
      if (error.response.data?.errors) {
        const validationErrors = Object.values(
          error.response.data.errors
        ).flat();
        throw new Error(validationErrors.join(", "));
      } else if (error.response.data?.message) {
        throw new Error(error.response.data.message);
      }
    }

    if (error.response?.status === 409) {
      // Conflict - user already exists
      throw new Error("An account with this email already exists.");
    }

    if (error.response?.status >= 500) {
      // Server error
      throw new Error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
