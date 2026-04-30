import { useEffect, useState } from "react";
import { createFilm, editFilm } from "../../data/filmApi";

function FilmFormModal({ isOpen, onClose, film, onSaved }) {

    const isEdit = !!film;

    const [form, setForm] = useState({
        id: "",
        title: "",
        genre: "",
        image: "",
        videoUrl: "",
        imageCarrousel: ""
    });

    useEffect(() => {
        if (film) {
            setForm({
                id: film.id,
                title: film.title || "",
                genre: film.genre || "",
                image: film.image || "",
                videoUrl: film.videoUrl || "",
                imageCarrousel: film.imageCarrousel || ""
            });
        } else {
            setForm({
                id: "",
                title: "",
                genre: "",
                image: "",
                videoUrl: "",
                imageCarrousel: ""
            });
        }
    }, [film]);

    if (!isOpen) return null;

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await editFilm(form); // IMPORTANTE: incluye id
            } else {
                await createFilm(form);
            }

            if (onSaved) onSaved();
            onClose();

        } catch (e) {
            console.error(e);
            alert("Error guardando película");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="bg-[#1f1f1f] p-6 rounded-xl w-[90%] md:w-[500px]">

                <h2 className="text-xl mb-6 text-center">
                    {isEdit ? "Editar película" : "Crear película"}
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        placeholder="Título"
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className="p-2 bg-gray-800 rounded"
                    />

                    <input
                        placeholder="Género"
                        value={form.genre}
                        onChange={(e) => handleChange("genre", e.target.value)}
                        className="p-2 bg-gray-800 rounded"
                    />

                    <input
                        placeholder="Imagen"
                        value={form.image}
                        onChange={(e) => handleChange("image", e.target.value)}
                        className="p-2 bg-gray-800 rounded"
                    />

                    <input
                        placeholder="Video URL"
                        value={form.videoUrl}
                        onChange={(e) => handleChange("videoUrl", e.target.value)}
                        className="p-2 bg-gray-800 rounded"
                    />

                    <input
                        placeholder="Imagen carrusel"
                        value={form.imageCarrousel}
                        onChange={(e) => handleChange("imageCarrousel", e.target.value)}
                        className="p-2 bg-gray-800 rounded"
                    />

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={onClose}
                            className="bg-gray-600 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSubmit}
                            className="bg-filmGold text-black px-4 py-2 rounded"
                        >
                            Guardar
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default FilmFormModal;