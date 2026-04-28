function AdminModal({ isOpen, onClose, children, title }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">

            <div className="bg-[#1f1f1f] p-6 rounded-xl w-[500px]">

                <h2 className="text-xl mb-4">{title}</h2>

                {children}

                <button
                    onClick={onClose}
                    className="mt-4 bg-red-600 px-4 py-2 rounded"
                >
                    Cerrar
                </button>

            </div>

        </div>
    );
}

export default AdminModal;