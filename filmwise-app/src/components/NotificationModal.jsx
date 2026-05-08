import { editMessageStatus, editMessageChallengeStatus } from "../data/userApi";
import NotificationCard from "./NotificationCard";

const NotificationModal = ({ isOpen, onClose, user, friendsMessages, challengesMessages, updateMessages }) => {

  if (!isOpen) return null;

  const handleResponse = async (emisorName, receptorName, id, response, type) => {
    try {
      if (type === "friend") {
        await editMessageStatus(emisorName, receptorName, id, response);
      } else {
        await editMessageChallengeStatus(id, response);
      }
      // sincroniza home y contador
      await updateMessages();
    } catch (error) {
      console.log(error.message);
    }
  };

  // array combinado
  const messages = [
    ...friendsMessages.map(m => ({ ...m, type: "friend" })),
    ...challengesMessages.map(m => ({ ...m, type: "challenge" }))
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-filmGray w-[90%] md:w-[600px] rounded-2xl px-3 py-4 md:p-6 relative max-h-[800px] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-serif mb-6 text-center">
          NOTIFICACIONES
        </h2>

        <div className="flex flex-col gap-4">
          {messages.length == 0 ? (
            <p className="text-center text-gray-300">
              No tienes notificaciones en este momento.
            </p>
          ) : (
            messages.map((message) => (
              <NotificationCard
                key={message.id}
                id={message.id}
                name={message.emisorName}
                msg={message.messageText}
                type={message.type}
                date={message.date}
                onAction={handleResponse}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;