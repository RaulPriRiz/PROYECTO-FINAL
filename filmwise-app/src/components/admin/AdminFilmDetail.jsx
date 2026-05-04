import { useEffect, useState } from "react";
import { getFilmQuestions } from "../../data/filmApi";
import { deleteQuestion } from "../../data/questionApi";
import AdminModal from "./AdminModal";
import QuestionEditor from "./QuestionEditor";
import CreateAnswerModal from "./CreateAnswerModal";
import CreateQuestionModal from "./CreateQuestionModal";

function AdminFilmDetail({ film, onClose }) {

    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [selectedQuestionForAnswer, setSelectedQuestionForAnswer] = useState(null);
    const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false);

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
        <div className="fixed inset-0 bg-black/90 z-50 p-4 md:p-10 overflow-auto">

            <div className="max-w-4xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl text-center md:text-left">
                        {film.title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="bg-red-600 px-4 py-2 rounded w-full md:w-auto"
                    >
                        Cerrar
                    </button>
                </div>

                {/* BOTÓN AÑADIR */}
                <button
                    onClick={() => setShowCreateQuestionModal(true)}
                    className="mb-6 bg-green-600 px-4 py-2 rounded w-full md:w-auto"
                >
                    + Añadir pregunta
                </button>

                {/* LISTADO DE PREGUNTAS */}
                <div className="flex flex-col gap-6">

                    {questions.map((q) => (
                        <div key={q.id} className="bg-[#1f1f1f] p-4 md:p-6 rounded">

                            {/* PREGUNTA */}
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">

                                <div>
                                    <p className="text-base md:text-lg font-semibold">
                                        {q.questionText}
                                    </p>
                                    <p className="text-sm opacity-70">
                                        Segundo: {q.startSeconds}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => openEditModal(q)}
                                        className="bg-yellow-600 px-3 py-1 rounded w-full sm:w-auto"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedQuestionForAnswer(q);
                                            setShowAnswerModal(true);
                                        }}
                                        className="bg-blue-600 px-3 py-1 rounded w-full sm:w-auto"
                                    >
                                        + Respuesta
                                    </button>

                                    <button
                                        onClick={() => handleDeleteQuestion(q)}
                                        className="bg-red-600 px-3 py-1 rounded w-full sm:w-auto"
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
                                        className={`p-2 rounded text-sm md:text-base ${ans.correct
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
                    <QuestionEditor
                        question={selectedQuestion}
                        filmId={film.id}
                    />
                )}
            </AdminModal>

            {/* MODAL CREAR RESPUESTA */}
            <CreateAnswerModal
                isOpen={showAnswerModal}
                onClose={() => setShowAnswerModal(false)}
                question={selectedQuestionForAnswer}
                onCreated={async () => {
                    const data = await getFilmQuestions(film.title);
                    setQuestions(data);
                }}
            />

            {/* MODAL CREAR PREGUNTA */}
            <CreateQuestionModal
                isOpen={showCreateQuestionModal}
                onClose={() => setShowCreateQuestionModal(false)}
                filmId={film.id}
                onCreated={async () => {
                    const data = await getFilmQuestions(film.title);
                    setQuestions(data);
                }}
            />

        </div>
    );
}

export default AdminFilmDetail;