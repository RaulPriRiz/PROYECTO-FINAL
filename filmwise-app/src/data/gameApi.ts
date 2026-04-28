import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/game`;

export const createNewGame = async (userName:string, filmTitle:string, mode:string) => {
    const response = await fetch(API_URL + "/newGame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
      filmTitle: filmTitle,
      mode: mode
    })
  });
  
  if(!response.ok){
    throw new Error("Error al crear la partida");
  } 

  return await response.json();
}

export const updateGame = async (userName:string, filmTitle:string, lastTime:number) => {
  const response = await fetch(`${API_URL}/update`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
      filmTitle: filmTitle,
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

export const editGameScore = async (userName:string, filmTitle:string, newScore:number) => {
    const response = await fetch(`${API_URL}/editScore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
      filmTitle: filmTitle,
      score: newScore
    })
  });

  if (!response.ok) {
    throw new Error("Error al editar el score de la partida");
  }
}

export const editGameIsFinished = async (userName:string, filmTitle:string) => {

  const response = await fetch(API_URL + "/editIsFinished", {
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName: userName,
      filmTitle: filmTitle    
    })
  });

  if (!response.ok) {
    throw new Error("Error al editar el estado de la partida");
  }
}
