import { useState, useEffect } from "react";

function QuestionModal({ isOpen, question, onAnswer }) {

  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setAnswered(false);
  }, [question]);

  console.log("ANSWERS:", question?.answers);

  if (!isOpen || !question) return null;

  const handleClick = (ans) => {
    if (answered) return;

    setSelected(ans);
    setAnswered(true);

    onAnswer(ans);
  };

  const getButtonClass = (ans) => {

    if (!answered) {
      return "bg-filmGold text-filmBlack";
    }

    if (selected === ans) {
      return ans.correct
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white";
    }

    return "bg-gray-600 text-gray-300";
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <div className="bg-[#1f1f1f] p-6 rounded-xl w-[90%] md:w-[600px]">

        <h2 className="text-xl mb-4 text-white text-center">
          {question.questionText}
        </h2>

        <div className="flex flex-col gap-3">
          {question.answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => handleClick(ans)}
              disabled={answered}
              className={`py-2 rounded-lg transition ${getButtonClass(ans)}`}
            >
              {ans.answerText}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}

export default QuestionModal;