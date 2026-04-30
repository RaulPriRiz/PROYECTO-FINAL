import { useEffect, useState } from "react";
import { createAnswer } from "../../data/answerApi";

function CreateAnswerModal({ isOpen, onClose, question, onCreated }) {

    const [form, setForm] = useState({
        answerText: "",
        correct: false,
        questionId: null
    });

    // Cada vez que se abre o cambia la pregunta resetea form
    useEffect(() => {
        if (question) {
            setForm({
                answerText: "",
                correct: false,
                questionId: question.id
            });
        }
    }, [question, isOpen]);

    if (!isOpen || !question) return null;

    const handleChange = (field, value) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!form.answerText.trim()) {
                alert("La respuesta no puede estar vacía");
                return;
            }

            await createAnswer(form);

            if (onCreated) onCreated();

            onClose();

        } catch (e) {
            console.error(e);
            alert("Error creando respuesta");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="bg-[#1f1f1f] p-6 rounded-xl w-[90%] md:w-[400px]">

                <h2 className="text-xl mb-6 text-center">
                    Nueva respuesta
                </h2>

                <div className="flex flex-col gap-4">

                    {/* TEXTO */}
                    <input
                        value={form.answerText}
                        onChange={(e) => handleChange("answerText", e.target.value)}
                        placeholder="Texto de la respuesta"
                        className="p-2 bg-gray-800 rounded"
                    />

                    {/* CORRECTA */}
                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={form.correct}
                            onChange={(e) => handleChange("correct", e.target.checked)}
                        />
                        Respuesta correcta
                    </label>

                    {/* INFO */}
                    <div className="text-xs text-gray-400">
                        Pregunta: {question.id}
                    </div>

                    {/* BOTONES */}
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
                            Crear
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CreateAnswerModal;