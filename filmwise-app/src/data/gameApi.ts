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
  
  if(!response.ok){
    throw new Error("Error al crear la partida");
  } 
}

export const updateGame = async (userId:number, filmdId:number, lastTime:number) => {
  const response = await fetch(`${API_URL}/update`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId:userId,
      filmdId:filmdId,
      lastTime: lastTime
      //La fecha lastPlayed la puede poner el Backend automáticamente con LocalDate.now()
    })
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la partida");
  }
};

export const getRecentGames = async (name:string) => {
  const response = await fetch(`${API_URL}/recent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name:name
    })
  });

  if (!response.ok) {
    throw new Error("Error al obtener partidas recientes");
  }

  return await response.json();
};
