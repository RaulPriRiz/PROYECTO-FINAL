import { useState, useEffect } from "react";
import { editQuestion } from "../../data/questionApi";
import { editAnswer } from "../../data/answerApi";

function QuestionEditor({ question, filmId}) {

    const [text, setText] = useState("");
    const [seconds, setSeconds] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (!question) return;

        setText(question.questionText);
        setSeconds(question.startSeconds);
        setAnswers(question.answers);
    }, [question]);

    const handleAnswerChange = (index, value) => {
        const updated = [...answers];
        updated[index].answerText = value;
        setAnswers(updated);
    };

    const handleCorrectChange = (index) => {
        const updated = answers.map((a, i) => ({
            ...a,
            correct: i === index
        }));
        setAnswers(updated);
    };

    const handleSave = async () => {
        try {
            // 1. actualizar pregunta
            await editQuestion({
                id: question.id,
                questionText: text,
                startSeconds: seconds,
                filmId: filmId
            });

            // 2. actualizar respuestas
            for (const ans of answers) {
                await editAnswer(ans);
            }

            alert("Cambios guardados");

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex flex-col gap-4">

            {/* TEXTO */}
            <div>
                <label>Pregunta:</label>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 bg-gray-800 rounded"
                />
            </div>

            {/* SEGUNDOS */}
            <div>
                <label>Segundo:</label>
                <input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(Number(e.target.value))}
                    className="w-full p-2 bg-gray-800 rounded"
                />
            </div>

            {/* RESPUESTAS */}
            <div className="flex flex-col gap-3">

                <label>Respuestas:</label>

                {answers.map((ans, i) => (
                    <div key={i} className="flex items-center gap-2">

                        <input
                            value={ans.answerText}
                            onChange={(e) =>
                                handleAnswerChange(i, e.target.value)
                            }
                            className="flex-1 p-2 bg-gray-800 rounded"
                        />

                        <input
                            type="radio"
                            checked={ans.correct}
                            onChange={() => handleCorrectChange(i)}
                        />

                    </div>
                ))}
            </div>

            <button
                onClick={handleSave}
                className="bg-filmGold text-black py-2 rounded mt-4"
            >
                Guardar cambios
            </button>

        </div>
    );
}

export default QuestionEditor;