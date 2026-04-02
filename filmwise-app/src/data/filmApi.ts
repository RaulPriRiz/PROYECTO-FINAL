const API_KEY: string = "71fb13539da0df28f3f1ad418ffa652a";

export async function getMoviesByTitle(title: string) {
  const API_URL = "https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=";

  const resp = await fetch(API_URL + title);

  if (!resp.ok) {
    throw new Error("Error al obtener las peliculas");
  }

  const data = await resp.json();

  return data.results[0];
}