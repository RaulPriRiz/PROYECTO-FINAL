import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/questions`;


//devuelve una lista de objetos Question con todas las preguntas
export const getQuestions = async () => {
 
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener las preguntas");
  } 

  return await response.json();
};

export const editQuestion = async (question: any) => {
  const response = await fetch(`${API_URL}/updateQuestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question)
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la pregunta");
  }

};

export const deleteQuestion = async (question: any) => {
  const response = await fetch(`${API_URL}/deleteQuestion`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar la pregunta");
  }
};

export const createQuestion = async (question:any) => {
  const response = await fetch(`${API_URL}/newQuestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question)
  });

  if (!response.ok) {
    throw new Error("Error al crear la pregunta");
  }
}