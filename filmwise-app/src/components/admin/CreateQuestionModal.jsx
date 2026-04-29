import { useState } from "react";
import { createQuestion } from "../../data/questionApi";

function CreateQuestionModal({ isOpen, onClose, film, onCreated }) {

    const [form, setForm] = useState({
        questionText: "",
        startSeconds: 0,
        filmId: film?.id
    });

    if (!isOpen) return null;

    const handleSubmit = async () => {
        try {
            await createQuestion(form);
            if (onCreated) onCreated();
            onClose();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="bg-[#1f1f1f] p-6 rounded w-[400px]">

                <h2 className="mb-4 text-center">Nueva pregunta</h2>

                <input
                    placeholder="Pregunta"
                    className="p-2 bg-gray-800 w-full mb-3"
                    onChange={(e) => setForm({ ...form, questionText: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Segundo"
                    className="p-2 bg-gray-800 w-full mb-3"
                    onChange={(e) => setForm({ ...form, startSeconds: Number(e.target.value) })}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-filmGold text-black w-full py-2"
                >
                    Crear
                </button>

            </div>

        </div>
    );
}

export default CreateQuestionModal;