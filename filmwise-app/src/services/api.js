export const API_BASE = "http://localhost:8080/api";

export const fetchWithAuth = async (endpoint, options = {}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error("Error en petición autenticada");
    }

    return response.json();
};