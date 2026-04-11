function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[#252525] p-5 w-full md:w-[500px] flex items-center gap-4">

      <img
        src={icon}
        alt="icon"
        className="w-12 h-12 md:w-16 md:h-16 object-contain"
      />

      <div>
        <p className="text-lg md:text-2xl">
          {title}
        </p>

        <p className="text-2xl md:text-3xl font-semibold">
          {value}
        </p>
      </div>

    </div>
  );
}

export default StatCard;