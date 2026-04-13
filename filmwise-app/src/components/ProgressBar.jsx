const ProgressBar = ({ percent }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-6 overflow-hidden">
      <div
        className="bg-blue-400 h-full rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;