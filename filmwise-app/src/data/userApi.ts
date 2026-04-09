import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/user`;

export const registerUser = async (userData: any) => {
  
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if(!response.ok) throw new Error("Correo o usuario ya existente");
    
  return response.json();    
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};