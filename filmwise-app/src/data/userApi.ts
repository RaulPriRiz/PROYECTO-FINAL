import { API_BASE } from "./api";

const API_URL: string = `${API_BASE}/user`;

//devuelve una lista de objetos User con todas los usuarios
export const getUsers = async () => {
 
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Error al obtener lo usuarios");
  } 

  return await response.json();
};

export const registerUser = async (name:string, email:string, password:string, rol:string) => {
  
  const response = await fetch(API_URL + "/register", {
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
    const response = await fetch(API_URL + "/login", {
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
export const getUser = async (name:string, token:string) => {
  const response = await fetch (API_URL + "/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token //Mando el token del usuario en el header
      },
      body: JSON.stringify({name:name}) 
  });

  if (response.status === 403) {
    throw new Error("UNAUTHORIZED");
  }

  if (!response.ok) {
    throw new Error('Error al obtener el usuario');
  }
 
  const data = await response.json();
  return data;
};

//devuelve el numero de amigos que tiene el usuario por el nombre
export const getFriendsCount = async (name: string) => {
  const res = await fetch(API_URL + "/friends/number",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:name})
    });

  if(!res.ok) throw new Error('Error al obtener los amigos');

  const data = await res.text();
  return data;
};

//devuelve los mensajes de las solicitudes de amistad de un usuario que tengan status PENDIENTE
export const getFriendsMessages = async (name: string) => {
  const response = await fetch(API_URL + "/friends/messages", 
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({name:name})
    });

    if(!response.ok) throw new Error("Error al obtener tus mensajes");

    const data = await response.json();
    return data;
};

//si el usuario acepta o rechaza el mensaje, hay que editar el status del mensaje de amistad
export const editMessageStatus = async (nameEmisor: string, newStatus:string, nameReceptor:string) => {
  const response = await fetch(API_URL + "/friends/editStatus",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        nameEmisor:nameEmisor,
        newStatus:newStatus,
        nameReceptor:nameReceptor
      })
    });

    if(!response.ok) throw new Error("Error al aceptar o rechazar la solicitud");
};

//registra un nuevo mensaje de amistad en la BD con el nombre de quien lo envia y a quien lo envia
export const createNewMessage = async (emisorName:string, receptorName:string) => {
  const response = await fetch(API_URL + "/friends/newMessage",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        emisorName:emisorName, 
        receptorName:receptorName
      })
    });

  const data = await response.text(); 
  
  if(!response.ok || data == "Error: usuario no encontrado"){
    throw new Error(data);
  } 

};

export const editName = async (oldName: string, newName: string) => {

  const response = await fetch( API_URL + "/edit/name", {
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
};

export const editEmail = async (oldEmail: string, newEmail: string) => {

  const response = await fetch(API_URL + "/edit/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldEmail: oldEmail,
      newEmail: newEmail
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el email');
  }
};

export const editImage = async (name: string, newImage: string) => {

  const response = await fetch(API_URL + "/edit/image", {
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
};

//devuelve una lista de objetos MissionResponse del usuario con descripcion, points(los que se requieren la mission) y pointsCompleted (los que lleva el usuario)
export const getMissions = async (name: string) => {

  const response = await fetch(API_URL + "/missions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name    
    })
  });

  if (!response.ok) {
    throw new Error('Error al obtener las misiones');
  }

  const data = await response.json();
  return data;
};

export const editScore = async (name: string, scoreIncrease:number) => {
  const response = await fetch(API_URL + "/edit/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      number: scoreIncrease    
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar score');
  }
}

export const editGamesPlayed = async (name:string) => {
 const response = await fetch(API_URL + "/edit/gamesPlayed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el numero de partidas jugadas');
  }
}

export const editLevel = async (name:string) => {
    const response = await fetch(API_URL + "/edit/level", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el level');
  }
}

export const editCorrectAnswers = async (name: string, correctAnswersIncrease:number) => {
  const response = await fetch(API_URL + "/edit/correctAnswers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      number: correctAnswersIncrease    
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el número de respuestas correctas');
  }
}

export const editBestScore = async (name: string, actualScore:number) => {
  const response = await fetch(API_URL + "/edit/bestScore", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      number: actualScore    
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar el mejor score');
  }
}

export const editFavoriteGenre = async (name:string) => {
  const response = await fetch(API_URL + "/editFavoriteGenre", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name
    })
  });

  if (!response.ok) {
    throw new Error('Error al editar genero favorito');
  }
}

export const getRankingUsers = async() => {
  const response = await fetch(API_URL + "/rankingUsers");

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios del ranking");
  } 

  return await response.json();

}

export const getChallengesMessages = async (name:string) => {
    const response = await fetch(API_URL + "/challenges/messages", 
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({name:name})
    });

    if(!response.ok) throw new Error("Error al obtener tus mensajes de retos");

    const data = await response.json();
    return data;
}

export const editMessageChallengeStatus = async (nameEmisor: string, newStatus:string, nameReceptor:string) => {
  const response = await fetch(API_URL + "/challenges/editStatus",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        nameEmisor:nameEmisor,
        newStatus:newStatus,
        nameReceptor:nameReceptor
      })
    });

    if(!response.ok) throw new Error("Error al aceptar o rechazar el reto");

}

export const createNewChallengeMessage = async(emisorName:string, receptorName:string, filmTitle:string) => {
    const response = await fetch(API_URL + "/challenges/newMessage",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        emisorName:emisorName, 
        receptorName:receptorName,
        filmTitle:filmTitle
      })
    });

  const data = await response.text(); 
  
  if(!response.ok || data == "Error: usuario no encontrado"){
    throw new Error(data);
  } 
}

export const editUser = async (user:any) => {

  const response = await fetch(`${API_URL}/updateUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el usuario");
  }
};

export const deleteUser = async (name: string) => {
  const response = await fetch(`${API_BASE}/deleteUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo eliminar al usuario");
  }
};