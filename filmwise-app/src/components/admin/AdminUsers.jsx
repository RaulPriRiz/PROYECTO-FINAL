import { useEffect, useState } from "react";
import { getRankingUsers } from "../../data/userApi";

function AdminUsers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getRankingUsers();
            setUsers(data);
        };

        fetchUsers();
    }, []);

    return (
        <div>

            <h2 className="text-2xl mb-6">Usuarios</h2>

            <button className="mb-4 bg-green-600 px-4 py-2 rounded">
                + Crear usuario
            </button>

            <div className="flex flex-col gap-4">
                {users.map((u, i) => (
                    <div key={i} className="bg-[#1f1f1f] p-4 rounded flex justify-between">

                        <div>
                            <p>{u.name}</p>
                            <p className="text-sm opacity-70">{u.score} pts</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-yellow-600 px-3 py-1 rounded">
                                Editar
                            </button>
                            <button className="bg-red-600 px-3 py-1 rounded">
                                Eliminar
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default AdminUsers;