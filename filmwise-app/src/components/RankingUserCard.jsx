function RankingUserCard({ name, picture, points, position }) {

  const firstColor = position == 1 ? "bg-gradient-to-r from-fuchsia-400 to-blue-400" : "bg-[#252525]";

  return (
    <div className={`relative rounded-2xl px-4 md:px-6 h-20 flex items-center text-white ${firstColor}`}>

      <div className="text-3xl font-bold w-14">
        #{position}
      </div>

      <img
        src={picture}
        alt={name}
        className="w-14 h-14 rounded-full object-cover -ml-2 md:ml-1"
      />

      <div className="ml-4 flex-1 flex items-center justify-between">
        <p className="text-lg md:text-xl font-semibold">{name}</p>
        <p className="text-lg md:text-xl font-semibold">{points} pts</p>
      </div>

    </div>
  );
}

export default RankingUserCard;