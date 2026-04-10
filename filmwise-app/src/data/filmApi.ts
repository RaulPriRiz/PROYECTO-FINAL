import { API_BASE } from "./api";
import { IFilm, IFilmDetails} from "../types/Interfaces";

const API_KEY: string = "71fb13539da0df28f3f1ad418ffa652a";

const API_URL: string = `${API_BASE}/films`;

export async function getMoviesByTitle(title: string) : Promise<IFilmDetails> {
  
  const API_URL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=";

  const resp = await fetch(API_URL + title);

  if (!resp.ok) {
    throw new Error("Error al obtener las peliculas");
  }

  const data = await resp.json();

  return data.results[0];
}

export const getFilms = async () : Promise<IFilm> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener las películas");
    } 

    return await response.json();

  } catch (error) {
    console.error("Error en getFilms:", error);
    throw error;
  
  }
};
