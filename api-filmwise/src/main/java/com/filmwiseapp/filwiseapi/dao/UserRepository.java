package com.filmwiseapp.filwiseapi.dao;

import java.util.List;
import org.springframework.stereotype.Repository;

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
            return (User) entityManager
                    .createNativeQuery(sql, User.class)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    public User findByEmailName(String email, String name)
    {
        String sql = "SELECT * FROM Usuario WHERE email = '" + email + "'" + " OR name = '"+ name +"'";

        try {
            return (User) entityManager
                    .createNativeQuery(sql, User.class)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}