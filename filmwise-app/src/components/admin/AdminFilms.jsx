import { useEffect, useState } from "react";
import { getFilms, deleteFilm } from "../../data/filmApi";
import AdminFilmDetail from "./AdminFilmDetail";
import FilmFormModal from "./FilmFormModal";

function AdminFilms() {

    const [films, setFilms] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [showFilmModal, setShowFilmModal] = useState(false);
    const [editingFilm, setEditingFilm] = useState(null);

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
        <div className="p-4 md:p-8 max-w-5xl mx-auto">

            <h2 className="text-2xl md:text-3xl mb-6 text-center md:text-left">
                Películas
            </h2>

            <button
                onClick={() => {
                    setEditingFilm(null);
                    setShowFilmModal(true);
                }}
                className="mb-6 bg-green-600 px-4 py-3 rounded w-full md:w-auto"
            >
                + Añadir película
            </button>

            <div className="flex flex-col gap-4">
                {films.map((film, i) => (
                    <div key={i} className="bg-[#1f1f1f] p-4 md:p-5 rounded-xl">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            {/* INFO */}
                            <div>
                                <p className="text-lg md:text-xl font-semibold">
                                    {film.title}
                                </p>
                                <p className="text-sm opacity-70">
                                    Género: {film.genre}
                                </p>
                                <p className="text-sm opacity-70">
                                    Modo: {film.mode}
                                </p>
                            </div>

                            {/* BOTONES */}
                            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">

                                <button
                                    onClick={() => {
                                        setEditingFilm(film);
                                        setShowFilmModal(true);
                                    }}
                                    className="bg-blue-600 px-3 py-2 rounded w-full sm:w-auto"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => setSelectedFilm(film)}
                                    className="bg-yellow-600 px-3 py-2 rounded w-full sm:w-auto"
                                >
                                    Editar preguntas
                                </button>

                                <button
                                    onClick={() => handleDelete(film.title)}
                                    className="bg-red-600 px-3 py-2 rounded w-full sm:w-auto"
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

            <FilmFormModal
                isOpen={showFilmModal}
                onClose={() => setShowFilmModal(false)}
                film={editingFilm}
                onSaved={async () => {
                    const data = await getFilms();
                    setFilms(data);
                }}
            />

        </div>
    );
}

export default AdminFilms;