import { useEffect, useState } from "react";
import { getFilmQuestions } from "../../data/filmApi";
import { deleteQuestion } from "../../data/questionApi";
import AdminModal from "./AdminModal";


function AdminFilmDetail({ film, onClose }) {

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!film) return;

        const fetchQuestions = async () => {
            try {
                const data = await getFilmQuestions(film.title);
                setQuestions(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchQuestions();
    }, [film]);

    const handleDeleteQuestion = async (q) => {
        try {
            await deleteQuestion(q);
            const data = await getFilmQuestions(film.title);
            setQuestions(data);
        } catch (e) {
            console.error(e);
        }
    };

    const openEditModal = (question) => {
        setSelectedQuestion(question);
        setShowModal(true);
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-50 p-10 overflow-auto">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl">{film.title}</h2>

                    <button
                        onClick={onClose}
                        className="bg-red-600 px-4 py-2 rounded"
                    >
                        Cerrar
                    </button>
                </div>

                {/* BOTÓN AÑADIR */}
                <button className="mb-6 bg-green-600 px-4 py-2 rounded">
                    + Añadir pregunta
                </button>

                {/* LISTADO DE PREGUNTAS */}
                <div className="flex flex-col gap-6">

                    {questions.map((q, i) => (
                        <div key={i} className="bg-[#1f1f1f] p-6 rounded">

                            {/* PREGUNTA */}
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p className="text-lg font-semibold">
                                        {q.questionText}
                                    </p>
                                    <p className="text-sm opacity-70">
                                        Segundo: {q.startSeconds}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(q)}
                                        className="bg-yellow-600 px-3 py-1 rounded"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDeleteQuestion(q)}
                                        className="bg-red-600 px-3 py-1 rounded"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>

                            {/* RESPUESTAS */}
                            <div className="flex flex-col gap-2">
                                {q.answers.map((ans, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-2 rounded ${ans.correct
                                            ? "bg-green-700"
                                            : "bg-gray-700"
                                            }`}
                                    >
                                        {ans.answerText}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}

                </div>
            </div>

            {/* MODAL EDITAR PREGUNTA */}
            <AdminModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Editar pregunta"
            >
                {selectedQuestion && (
                    <QuestionEditor question={selectedQuestion} />
                )}
            </AdminModal>

        </div>
    );
}

export default AdminFilmDetail;