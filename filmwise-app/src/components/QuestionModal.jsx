function QuestionModal({ isOpen, question, onAnswer }) {

  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

      <div className="bg-[#1f1f1f] p-6 rounded-xl w-[90%] md:w-[600px]">

        <h2 className="text-xl mb-4 text-white">
          {question.questionText}
        </h2>

        <div className="flex flex-col gap-3">
          {question.answers.map((ans, i) => (
            <button
              key={i}
              onClick={() => onAnswer(ans)}
              className="bg-filmGold text-filmBlack py-2 rounded-lg hover:opacity-80 transition"
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