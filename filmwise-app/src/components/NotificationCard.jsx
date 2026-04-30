import group from "../assets/group.svg";
import swords from "../assets/swords.svg";

function NotificationCard({ name, type, onAction }) {

  const isFriend = type === "friend";

  const icon = isFriend ? group : swords;

  const text = isFriend ? `${name} te ha enviado una solicitud de amistad.` : `${name} te ha retado a una partida.`;

  return (
    <div className="relative rounded-2xl px-4 md:px-7 h-20 flex items-center text-white bg-[#252525]">

      <img
        src={icon}
        alt={name}
        className="w-10 h-10"
      />

      <div className="ml-4 flex-1 flex items-center justify-between">

        <p className="text-sm md:text-base flex-1">
          {text}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => onAction(name, "ACEPTADA", type)}
            className="bg-green-600 hover:bg-green-600 px-4 py-1 rounded-full text-sm"
          >
            ACEPTAR
          </button>

          <button
            onClick={() => onAction(name, "RECHAZADA", type)}
            className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded-full text-sm"
          >
            RECHAZAR
          </button>
        </div>

      </div>
    </div>
  );
}

export default NotificationCard;