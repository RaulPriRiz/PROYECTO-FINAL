export const API_BASE = "http://localhost:8080/api";

export const fetchWithAuth = async (endpoint: string, options: any = {}) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = user?.token;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Error: no tienes permisos o el token ha caducado");
  }

  return response.json();
};