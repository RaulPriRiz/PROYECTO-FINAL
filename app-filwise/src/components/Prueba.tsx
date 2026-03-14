// UsersList.tsx
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  rol: string;
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => console.log("Error al obtener usuarios"));
  }, []);

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email} - {u.rol}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;