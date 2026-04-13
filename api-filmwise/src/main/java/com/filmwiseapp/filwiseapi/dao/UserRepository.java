package com.filmwiseapp.filwiseapi.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.dto.MissionResponse;
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
    public User create(User user) {

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

         String sql = "SELECT u.*, l.name AS levelName " +
                 "FROM Usuario u " +
                 "JOIN Level l ON u.LEVEL_ID = l.id " +
                 "WHERE u.name = '" + name + "'";

        try {
            return (User) entityManager.createNativeQuery(sql, User.class).getSingleResult();
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
    public String editName(String Oldname, String newName){

        String sql = "UPDATE USUARIO SET NAME = '"+ newName +"' WHERE NAME = '" + Oldname + "'";

        entityManager.createNativeQuery(sql).executeUpdate();

        return "Correcto";
    }

    @Transactional
    public String editEmail(String oldEmail, String newEmail){

        String sql = "UPDATE USUARIO SET EMAIL = '"+ newEmail +"' WHERE EMAIL = '" + oldEmail + "'";

        entityManager.createNativeQuery(sql).executeUpdate();

        return "Correcto";
    }

    @Transactional
    public String editImage(String name, String newImage){

        String sql = "UPDATE USUARIO SET IMAGE = '"+ newImage +"' WHERE NAME = '" + name + "'";

        entityManager.createNativeQuery(sql).executeUpdate();

        return "Correcto";
    }

    public List<MissionResponse> findUserMissions(String name){
        
        User user = findByName(name);
        
        String sql = "SELECT * FROM USER_COMPLETE_MISSION U JOIN MISSION M ON M.ID = U.MISSION_ID WHERE USER_ID = " + user.getId();

        return (List<MissionResponse>) entityManager.createNativeQuery(sql, MissionResponse.class).getResultList();
    }
}