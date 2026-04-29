import { useEffect, useState } from "react";
import { getFilms, deleteFilm } from "../../data/filmApi";
import AdminFilmDetail from "./AdminFilmDetail";

function AdminFilms() {

    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);

    const handleDelete = async (title) => {
        try {
            if (!confirm("¿Seguro que quieres eliminar esta película (se eliminarán todas sus preguntas y respuestas?")) return;            
            await deleteFilm(title);
            const data = await getFilms();
            setFilms(data);
        } catch (e) {
            alert(e.message);
        }
    };

    useEffect(() => {
        const fetchFilms = async () => {
            const data = await getFilms();
            setFilms(data);
        };

        fetchFilms();
    }, []);

    return (
        <div>

            <h2 className="text-2xl mb-6">Películas</h2>

            <button className="mb-4 bg-green-600 px-4 py-2 rounded">
                + Añadir película
            </button>

            <div className="flex flex-col gap-4">
                {films.map((film, i) => (
                    <div key={i} className="bg-[#1f1f1f] p-4 rounded">

                        <div className="flex justify-between">

                            <div>
                                <p className="text-lg">{film.title}</p>
                                <p className="text-sm opacity-70">{film.genre}</p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedFilm(film)}
                                    className="bg-yellow-600 px-3 py-1 rounded"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(film.title)}
                                    className="bg-red-600 px-3 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </div>

                        </div>

                    </div>
                ))}
            </div>

            {selectedFilm && (
                <AdminFilmDetail
                    film={selectedFilm}
                    onClose={() => setSelectedFilm(null)}
                />
            )}

        </div>
    );
}

export default AdminFilms;