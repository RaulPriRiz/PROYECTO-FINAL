import GameCard from "./GameCard";

function GameList() {

  const games = [
    { id: 1, title: "La Bella y la Bestia", mode: "Modo rápido", img: "https://img2.rtve.es/n/1503220" },
    { id: 2, title: "Django", mode: "Modo normal", img: "https://img2.rtve.es/n/1503220" },
    { id: 3, title: "Pulp Fiction", mode: "Modo rápido", img: "https://img2.rtve.es/n/1503220" },
    { id: 4, title: "El Resplandor", mode: "Modo rápido", img: "https://img2.rtve.es/n/1503220" }
  ];

  return (
    <div className="flex gap-6 mt-4 flex-wrap">
      {games.map((game) => (
        <GameCard
          key={game.id}
          title={game.title}
          mode={game.mode}
          image={game.img}
        />
      ))}
    </div>
  );
}

export default GameList;