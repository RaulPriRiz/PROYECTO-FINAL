import { useEffect, useState } from "react";
import { getUsers, deleteUser, editUser } from "../../data/userApi";
import AdminUserModal from "./AdminUserModal";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (name) => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (name === user.name) {
            alert("No puedes eliminarte a ti mismo");
            return;
        }

        if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;

        try {
            await deleteUser(name);
            const data = await getUsers();
            setUsers(data);
        } catch (e) {
            alert(e.message);
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleSave = async (updatedUser) => {
        try {
            await editUser(updatedUser);
            setShowModal(false);
            fetchUsers();
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto">

            <h2 className="text-2xl md:text-3xl mb-6 text-center md:text-left">
                Usuarios
            </h2>

            <div className="flex flex-col gap-4">
                {users.map((u, i) => (
                    <div key={i} className="bg-[#1f1f1f] p-4 md:p-5 rounded-xl">

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            {/* INFO */}
                            <div>
                                <p className="text-lg md:text-xl font-semibold">
                                    {u.name}
                                </p>
                                <p className="text-sm opacity-70">
                                    {u.email}
                                </p>
                                <p className="text-sm opacity-70">
                                    {u.score} pts
                                </p>
                                <p className="text-xs text-gray-400">
                                    {u.rol}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">

                                <button
                                    onClick={() => openEditModal(u)}
                                    className="bg-yellow-600 px-3 py-2 rounded w-full sm:w-auto"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(u.name)}
                                    className="bg-red-600 px-3 py-2 rounded w-full sm:w-auto"
                                >
                                    Eliminar
                                </button>

                            </div>

                        </div>

                    </div>
                ))}
            </div>

            {/* MODAL */}
            <AdminUserModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                user={selectedUser}
                onSave={handleSave}
            />

        </div>
    );
}

export default AdminUsers;