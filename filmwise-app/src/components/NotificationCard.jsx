import group from "../assets/group.svg";
import swords from "../assets/swords.svg";

function NotificationCard({ id, name, msg, date, type, onAction }) {

  const isFriend = type === "friend";

  const icon = isFriend ? group : swords;

  const text = isFriend ? `${name} te ha enviado una solicitud de amistad.` : `${name} te ha enviado un mensaje: "${msg}"`;
  
  const userLogin = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <div className="relative rounded-2xl px-4 md:px-7 py-3 flex flex-col text-white bg-[#252525]">

      {/* CONTENIDO */}
      <div className="flex items-center mt-3">

        <img
          src={icon}
          alt={name}
          className="w-10 h-10"
        />

        <div className="ml-4 flex-1 flex items-center justify-between">

          <p className="text-sm md:text-base flex-1">
            {text}
          </p>

          <div className="flex flex-col md:flex-row gap-2">
            {isFriend ? (
              <>
                <button
                  onClick={() => onAction(name, userLogin.name, id, "ACEPTADA", type)}
                  className="bg-green-600 hover:bg-green-600 px-3 md:px-4 py-1 rounded-full text-sm"
                >
                  ACEPTAR
                </button>

                <button
                  onClick={() => onAction(name, userLogin.name, id, "RECHAZADA", type)}
                  className="bg-red-700 hover:bg-red-600 md:px-3 py-1 rounded-full text-sm mb-2 md:mb-0"
                >
                  RECHAZAR
                </button>
              </>
            ) : (
              <button
                onClick={() => onAction(null, null, id, "ACEPTADA", type)}
                className="bg-red-700 hover:bg-red-600 px-2 md:px-4 py-1 rounded-full text-sm"
              >
                ELIMINAR
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FECHA */}
      <div className="flex justify-end">
        <span className="text-xs text-gray-400">
          {date}
        </span>
      </div>


    </div>
  );
}

export default NotificationCard;