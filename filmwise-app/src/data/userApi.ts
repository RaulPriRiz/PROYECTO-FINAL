import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/user`;

export const registerUser = async (name:string, email:string, password:string, rol:string) => {
  
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      rol: rol
    })
  });

  //convierte el body de response en un string plano (no nos hace falta más porque el servidor solo devuelve un string)
  const data = await response.text();

  if(!response.ok || data == "Ese correo ya existe" || data == "Ese nombre ya existe"){
    throw new Error(data);
  } 

};

export const loginUser = async (email:string, password:string) => {

    //un objeto response tiene ok, status, headers, body...
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      //envia un string en forma de JSON
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    //convierte el body del objeto response en un json
    const data = await response.json()

    if(!response.ok || !data.success){
      throw new Error(data.message);
    } 
    
    return data;
};

//devuelve TODOS los datos del usuario
export const getUser = async (name:string) => {

  const response = await fetch (`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name})
  });

  if (!response.ok) {
    throw new Error('Error al obtener el usuario');
  }
 
  const data = await response.json();
  return data;
};

//devuelve el numero de amigos que tiene el usuario por el nombre
export const getFriendsCount = async (name: string) => {
  const res = await fetch(`${API_URL}/friends/number`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name})
    });

    const data = await res.text();
  return data;
};

export const editName = async (oldName: string, newName: string) => {

  const response = await fetch(`${API_URL}/edit/name`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldName: oldName,
      newName: newName
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el nombre');
  }

  const data = await response.text();
  return data;
  
};

export const editEmail = async (oldEmail: string, newEmail: string) => {

  const response = await fetch(`${API_URL}/edit/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldMail: oldEmail,
      newMail: newEmail
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el email');
  }

  const data = await response.text();
  return data;
};

export const editImage = async (name: string, newImage: string) => {

  const response = await fetch(`${API_URL}/edit/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      newImage: newImage
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar la imagen');
  }

  const data = await response.text();
  return data;
};