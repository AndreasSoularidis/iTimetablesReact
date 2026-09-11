import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  sessionStorage.removeItem("firstName");
  localStorage.removeItem("refreshToken");
}

export function isAuthenticated(): boolean {
  return !!accessToken || !!localStorage.getItem("refreshToken");
}

// Decodes a JWT's payload without verifying its signature (verification is the backend's job)
function decodeJwtExp(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof decoded.exp === "number" ? decoded.exp : null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  const exp = decodeJwtExp(token);
  if (exp === null) return true;
  return Date.now() >= exp * 1000;
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return false;
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
    setTokens(data.accessToken, data.refreshToken, data.firstName);
    return true;
  } catch {
    return false;
  }
}

// Resolves whether the user has (or can silently obtain) a valid access token
export async function ensureAuthenticated(): Promise<boolean> {
  if (accessToken && !isTokenExpired(accessToken)) return true;
  const refreshed = await refreshAccessToken();
  if (!refreshed) clearTokens();
  return refreshed;
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
      if (await refreshAccessToken()) {
        original.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(original);
      }
      clearTokens();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
