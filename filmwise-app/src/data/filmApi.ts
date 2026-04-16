import { API_BASE } from "./api";

const API_KEY: string = "71fb13539da0df28f3f1ad418ffa652a";

const API_URL: string = `${API_BASE}/films`;

export async function getMoviesByTitle(title: string) {
  
  const API_URL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=";

  const resp = await fetch(API_URL + title);

  if (!resp.ok) {
    throw new Error("Error al obtener las peliculas");
  }

  const data = await resp.json();

  return data.results[0];
}

//devuelve una lista de objetos Film con todas las pelis
export const getFilms = async () => {
 
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener las películas");
  } 

  return await response.json();
};

//devuelve solo las pelis con fecha de máximo hace una semana para el carrousel
export const getNewFilms = async () => {
  
  const response = await fetch(API_URL + "/newfilms");

  if(!response.ok) {
    throw new Error("Error al obtener las nuevas películas disponibles");
  }
  
  return await response.json();
};

export const getFilm = async (title:string) => {

  const response = await fetch(API_URL + "/film", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },  
    //envia un string en forma de JSON
    body: JSON.stringify({
    name: title
    })
  });

  if(!response.ok){
    throw new Error("Error al obtener la película");
  }

  return await response.json();
};

//Devuelve una LISTA de preguntas dado un titulo de una pelicula y cada pregunta tiene OTRA LISTA de respuestas
export const getFilmQuestions = async (title: string) => {

  const response = await fetch(API_URL + "/film/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },  
    //envia un string en forma de JSON
    body: JSON.stringify({
    name: title
    })
  });

  if(!response.ok){
    throw new Error ("Error al obtener las preguntas y respuestas de la pelicula");
  }

  return await response.json();
}
