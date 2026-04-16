import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/game`;

export const createNewGame = async (userId:number, filmId:number, mode:string) => {
    const response = await fetch(API_URL + "/newGame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      filmId: filmId,
      mode: mode
    })
  });

  const data = await response.text(); 
  
  if(!response.ok){
    throw new Error("Error al crear el juego");
  } 
}

export const updateGame = async (id: number, lastSeconds: number) => {
  const response = await fetch(`${API_URL}/update`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      lastSeconds: lastSeconds
      //La fecha 'lastPlayed' la puede poner el Backend automáticamente con LocalDate.now()
    })
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la partida");
  }
};
