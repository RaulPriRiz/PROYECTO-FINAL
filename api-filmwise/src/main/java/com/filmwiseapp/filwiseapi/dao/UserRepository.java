package com.filmwiseapp.filwiseapi.dao;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

import com.filmwiseapp.filwiseapi.dto.FriendRequest;
import com.filmwiseapp.filwiseapi.dto.FriendsResponse;
import com.filmwiseapp.filwiseapi.dto.MissionResponse;
import com.filmwiseapp.filwiseapi.model.FriendMessage;
import com.filmwiseapp.filwiseapi.model.IsFriendOf;
import com.filmwiseapp.filwiseapi.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> findAll() {
        
        String sql = "SELECT * FROM Usuario";

        return (List<User>) entityManager.createNativeQuery(sql, User.class).getResultList();
    }

    public User findById(int id) {
        
        String sql = "SELECT * FROM Usuario WHERE id = " + id;

        try {
            return (User) entityManager.createNativeQuery(sql, User.class).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Transactional
    public User createUser(User user) {

        Integer maxId = getMaxId();

        if (maxId == null) {
            maxId = 0;
        }

        user.setId(maxId + 1);

        entityManager.persist(user);

        return user;
    }

    public Integer getMaxId() {

        String sql = "SELECT MAX(id) FROM Usuario";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

    public User findByEmail(String email) {
        
        String sql = "SELECT * FROM Usuario WHERE email = '" + email + "'";

        try {
            return (User) entityManager.createNativeQuery(sql, User.class).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public User findByName(String name){

        String sql = "SELECT u.*, l.name AS levelName FROM Usuario u JOIN Level l ON u.LEVEL_ID = l.id WHERE u.name = '" + name + "'";
        try {
            //Como levelName no es un atributo de User de la BD (lo he tenido que poner como @Transient pq es de la tabla Level) tengo que mapearlo yo manualmente, no JPA
            Object[] result = (Object[]) entityManager.createNativeQuery(sql).getSingleResult();
            User user = new User();
            user.setId((Integer) result[0]);
            user.setEmail((String) result[1]);
            user.setName((String) result[2]);
            user.setPassword((String) result[3]);
            user.setRol((String) result[4]);
            user.setImage((String) result[5]);
            user.setScore((Integer) result[6]);
            user.setBestScore((Integer) result[7]);
            user.setCorrectAnswers((Integer) result[8]);
            user.setFavoriteGenre((String) result[9]);
            user.setGamesPlayed((Integer) result[10]);
            user.setLevelId((Integer) result[11]);
            user.setLevelName((String) result[12]);            
            return user;        
        } catch (NoResultException e) {
            return null;
        }
    }

    public String findNumberOfFriends(String name){
        
        User user = findByName(name);

        String sql = "SELECT Count(*) FROM IS_FRIEND_OF WHERE Friend1 = " + user.getId() + " OR Friend2 = " + user.getId();

        String result = entityManager.createNativeQuery(sql).getSingleResult().toString();

        return result;
    }

    @Transactional
    public void editName(String Oldname, String newName){

        String sql = "UPDATE USUARIO SET NAME = '"+ newName +"' WHERE NAME = '" + Oldname + "'";

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    @Transactional
    public void editEmail(String oldEmail, String newEmail){

        String sql = "UPDATE USUARIO SET EMAIL = '"+ newEmail +"' WHERE EMAIL = '" + oldEmail + "'";

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    @Transactional
    public void editImage(String name, String newImage){

        String sql = "UPDATE USUARIO SET IMAGE = '"+ newImage +"' WHERE NAME = '" + name + "'";

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    //sumamos al score actual del usuario el scoreIncrease cuando se termina una partida
    @Transactional
    public void editScore(String name, int scoreIncrease){
        String sql = "UPDATE USUARIO SET SCORE = SCORE + "+ scoreIncrease +" WHERE NAME = '" + name + "'";

        entityManager.createNativeQuery(sql).executeUpdate();
    }

    public List<MissionResponse> findUserMissions(String name){
        
        User user = findByName(name);
        
        String sql = "SELECT DESCRIPCION, POINTS, POINTS_COMPLETED FROM USER_COMPLETE_MISSION U JOIN MISSION M ON M.ID = U.MISSION_ID WHERE USER_ID = " + user.getId();

        //tenemos que mapearlo manualmente porque si no no lo mapea bien a MissionResponse (ya que createNativeQuery(sql, MissionResponse.class) solo funciona si es una @Entity)
        //el getResultList devuelve una lista de arrays
        List<Object[]> results = (List<Object[]>) entityManager.createNativeQuery(sql).getResultList();
        
        List<MissionResponse> missions = new ArrayList<>();

        for (Object[] row : results) {
            
            MissionResponse mission = new MissionResponse();
            
            mission.setDescripcion((String) row[0]);    
            mission.setPoints((Integer) row[1]);       
            mission.setPointsCompleted((Integer) row[2]); 
            missions.add(mission);
        }

        return missions;
    }

    public List<FriendsResponse> findUserMessages(String name){
        
        User user = findByName(name);

        String sql = "SELECT * FROM FRIEND_MESSAGE WHERE idUserReceptor = " + user.getId() + " AND status = 'PENDIENTE'";

        List<FriendsResponse> res = new ArrayList<>();
        
        List<Object[]> results = (List<Object[]>) entityManager.createNativeQuery(sql).getResultList();

        for(Object[] row : results) {
            FriendsResponse friendMessage = new FriendsResponse();

            //buscamos el nombre del usuario que ha enviado el mensaje
            User emisorUser = findById((Integer)row[1]);

            friendMessage.setEmisorName(emisorUser.getName());
            friendMessage.setStatus((String)row[3]);
            res.add(friendMessage);
        }

        return res;
    }

    @Transactional
    public void createMessage(String emisorName, String receptorName) {
        
        Integer maxId = getMaxIdFriendMessage();

        if (maxId == null) {
            maxId = 0;
        }

        User userEmisor = findByName(emisorName);
        User userReceptor = findByName(receptorName);

        FriendMessage friendMessage = new FriendMessage();
        friendMessage.setId(maxId + 1);
        friendMessage.setIdUserEmisor(userEmisor.getId());
        friendMessage.setIdUserReceptor(userReceptor.getId());
        friendMessage.setStatus("PENDIENTE");

        entityManager.persist(friendMessage);
    }

    public Integer getMaxIdFriendMessage() {

        String sql = "SELECT MAX(id) FROM FRIEND_MESSAGE";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

    @Transactional
    public void editStatusMessage(String emisorName, String receptorName, String newStatus){

        User user = findByName(emisorName);
        //nos falta por saber el id del otro amigo (el del receptor)
        User user2 = findByName(receptorName);

        String sql = "UPDATE FRIEND_MESSAGE SET STATUS = '" + newStatus + "' WHERE ID_USER_EMISOR = " + user.getId() + " AND ID_USER_RECEPTOR = " + user2.getId();

        entityManager.createNativeQuery(sql).executeUpdate();

        //ahora añadimos la nueva amistad a la tabla IsFriendOf SOLO SI EL NUEVO ESTADO ES ACEPTADA (PUEDE SER TAMBIEN RECHAZADA)
        if(newStatus.equals("ACEPTADA")){
            
            Integer maxId = getMaxIdIsFriendOf();

            if (maxId == null) {
                maxId = 0;
            }
            

            //PERO ANTES HAY QUE COMPROBAR QUE NO EXISTA LA AMISTAD YA
            if(areFriends(user.getId(), user2.getId())) return;

            //si no existe ya la amistad entonces se crea:
            IsFriendOf newFriendShip = new IsFriendOf();
            newFriendShip.setId(maxId + 1);
            newFriendShip.setFriend1(user.getId());
            newFriendShip.setFriend2(user2.getId());
            entityManager.persist(newFriendShip);
        }
    }

    public boolean areFriends(int id1, int id2){

        String sql = "SELECT * FROM IS_FRIEND_OF WHERE Friend1 = " + id1 +" AND Friend2 = " + id2 + " OR Friend1 = " + id2 + " AND Friend2 = " + id1;
    
        //si hay registros devuelve true
        try {
            entityManager.createNativeQuery(sql).getSingleResult();
            return true;
            //si no hay registros devuelve false
        } catch (Exception e) {
            return false;
        }
    }

    public Integer getMaxIdIsFriendOf() {

        String sql = "SELECT MAX(id) FROM IS_FRIEND_OF";

        try {
            return (Integer) entityManager.createNativeQuery(sql).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }
}