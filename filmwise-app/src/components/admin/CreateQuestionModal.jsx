import { useState } from "react";
import { createQuestion } from "../../data/questionApi";

function CreateQuestionModal({ isOpen, onClose, filmId, onCreated }) {

    const [form, setForm] = useState({
        questionText: "",
        startSeconds: 0
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            await createQuestion({
                ...form,
                filmId: filmId   
            });

            if (onCreated) onCreated();
            onClose();

        } catch (e) {
            console.error(e);
            alert("Error creando pregunta");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="bg-[#1f1f1f] p-6 rounded w-[400px]">

                <h2 className="mb-4 text-center text-lg">
                    Nueva pregunta
                </h2>

                <input
                    placeholder="Pregunta"
                    className="p-2 bg-gray-800 w-full mb-3 rounded"
                    value={form.questionText}
                    onChange={(e) =>
                        setForm({ ...form, questionText: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Segundo"
                    className="p-2 bg-gray-800 w-full mb-4 rounded"
                    value={form.startSeconds}
                    onChange={(e) =>
                        setForm({ ...form, startSeconds: Number(e.target.value) })
                    }
                />

                <div className="flex gap-2">
                    <button
                        onClick={onClose}
                        className="bg-red-800 px-4 py-2 rounded w-full"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="bg-filmGold text-black px-4 py-2 rounded w-full"
                    >
                        Crear
                    </button>
                </div>

            </div>

        </div>
    );
}

export default CreateQuestionModal;