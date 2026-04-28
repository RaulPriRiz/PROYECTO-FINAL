import { useEffect, useState } from "react";
import { editUser } from "../../data/userApi";

function AdminUserModal({ isOpen, onClose, user, onUpdated }) {

    const [form, setForm] = useState(null);

    useEffect(() => {
        if (!user) return;

        setForm({ ...user }); // copiamos todo el objeto tal cual viene del backend

    }, [user]);

    if (!isOpen || !form) return null;

    const handleChange = (field, value) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {

            const userToSend = { ...form };

            // Evitar sobreescribir password si viene vacía
            if (!userToSend.password) {
                delete userToSend.password;
            }

            await editUser(userToSend);

            if (onUpdated) onUpdated();

            onClose();

        } catch (e) {
            console.error(e);
            alert("Error al actualizar usuario");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="bg-[#1f1f1f] p-6 rounded-xl w-[90%] md:w-[600px]">

                <h2 className="text-xl mb-6 text-center">
                    Editar usuario
                </h2>

                <div className="flex flex-col gap-4">

                    {/* NAME */}
                    <label className="text-sm text-gray-300">
                        Nombre de usuario
                    </label>
                    <input
                        value={form.name || ""}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Nombre"
                        className="p-2 bg-gray-800 rounded"
                    />

                    {/* EMAIL */}
                    <label className="text-sm text-gray-300">
                        Correo electrónico
                    </label>
                    <input
                        value={form.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Email"
                        className="p-2 bg-gray-800 rounded"
                    />

                    {/* ROL */}
                    <label className="text-sm text-gray-300">
                        Rol
                    </label>
                    <select
                        value={form.rol || ""}
                        onChange={(e) => handleChange("rol", e.target.value)}
                        className="p-2 bg-gray-800 rounded"
                    >
                        <option value="ADMIN">ADMIN</option>
                        <option value="REGISTRADO">REGISTRADO</option>
                        <option value="INVITADO">INVITADO</option>
                    </select>

                    <div className="flex justify-between mt-6">

                        <button
                            onClick={onClose}
                            className="bg-gray-600 px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSave}
                            className="bg-filmGold text-black px-4 py-2 rounded"
                        >
                            Guardar
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminUserModal;