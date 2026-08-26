import axios from "axios";

const BASE_URL = "https://localhost:7065/api";

// sessionStorage survives in-page navigation and location.href reloads within the same tab
let accessToken: string | null = sessionStorage.getItem("accessToken");

export function setTokens(access: string, refresh: string, firstName: string) {
  accessToken = access;
  sessionStorage.setItem("accessToken", access);
  sessionStorage.setItem("firstName", firstName);
  localStorage.setItem("refreshToken", refresh);
}

export function clearTokens() {
  accessToken = null;
  sessionStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const axiosInstance = axios.create({ baseURL: BASE_URL });

// Attach the Bearer token to every outgoing request
axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// On 401, attempt a silent token refresh and retry the original request once
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
          setTokens(data.accessToken, data.refreshToken, data.firstName);
          original.headers.Authorization = `Bearer ${data.accessToken}`;
          return axiosInstance(original);
        } catch {
          // Refresh failed — force re-login
        }
      }
      clearTokens();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
