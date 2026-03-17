package com.filmwiseapp.filwiseapi;

import java.util.List;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class UserRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<User> findAll() {
        return entityManager.createQuery("SELECT u FROM User u", User.class).getResultList();
    }

    public User findById(int id) {
        try {
            return entityManager.createQuery(
                    "SELECT u FROM User u WHERE u.id = ?1", User.class).setParameter(1, id).getSingleResult();
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
        try {
            return entityManager.createQuery(
                    "SELECT MAX(u.id) FROM User u", Integer.class).getSingleResult();
        } catch (Exception e) {
            return 0;
        }
    }

}
