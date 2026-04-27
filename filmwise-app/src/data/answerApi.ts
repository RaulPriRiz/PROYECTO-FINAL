import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/answers`;


//devuelve una lista de objetos Answer con todas las respuestas
export const getAnswers = async () => {
 
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener las respuestas");
  } 

  return await response.json();
};

export const editAnswer = async (answer: any) => {
  const response = await fetch(`${API_URL}/updateAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answer) 
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la respuesta");
  }
};

export const deleteAnswer = async (answer: any) => {
  const response = await fetch(`${API_BASE}/deleteAnswer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answer),
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la respuesta");
  }
};