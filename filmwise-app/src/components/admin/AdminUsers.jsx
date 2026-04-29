import { useEffect, useState } from "react";
import { getUsers, deleteUser, editUser } from "../../data/userApi";
import AdminUserModal from "./AdminUserModal";

function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);    

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (name) => {
        
        const user = JSON.parse(localStorage.getItem("user"));

        if(name === user.name){
            alert("No puedes eliminarte a ti mismo");
            return;
        }

        if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;            
        
        try {
            await deleteUser(name);
            fetchUsers();
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
        <div>

            <h2 className="text-2xl mb-6">Usuarios</h2>

            <div className="flex flex-col gap-4">
                {users.map((u, i) => (
                    <div key={i} className="bg-[#1f1f1f] p-4 rounded flex justify-between">

                        <div>
                            <p className="font-semibold">{u.name}</p>
                            <p className="text-sm opacity-70">{u.email}</p>
                            <p className="text-sm opacity-70">{u.score} pts</p>
                            <p className="text-xs text-gray-400">{u.rol}</p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => openEditModal(u)}
                                className="bg-yellow-600 px-3 py-1 rounded"
                            >
                                Editar
                            </button>

                            <button
                                onClick={() => handleDelete(u.name)}
                                className="bg-red-600 px-3 py-1 rounded"
                            >
                                Eliminar
                            </button>
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