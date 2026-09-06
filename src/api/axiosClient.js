import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject JWT token into requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Graceful error interceptor for offline fallback
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend is down or network disconnected
    if (!error.response) {
      console.warn("[Network/Offline] Backend unreachable. Running in offline mode.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;