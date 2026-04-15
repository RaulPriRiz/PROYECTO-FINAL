const ProgressBar = ({ percent, progress }) => {
  const isComplete = percent >= 100;
  return (
    <div className="flex items-center relative w-full bg-gray-700 rounded-full h-5 md:h-6 overflow-hidden">

      <div
        className={isComplete ? "bg-gradient-to-r from-green-500 to-blue-400 h-full rounded-full transition-all duration-500" : "bg-gradient-to-r from-purple-700 to-fuchsia-500 h-full rounded-full transition-all duration-500"}
        style={{ width: `${percent}%` }}
      />

      {progress && (
        <span className="absolute inset-0 flex items-center justify-center text-xs md:text-sm font-medium text-white">
          {isComplete ? "Completado" : progress}
        </span>
      )}

    </div>
  );
}

export default ProgressBar;