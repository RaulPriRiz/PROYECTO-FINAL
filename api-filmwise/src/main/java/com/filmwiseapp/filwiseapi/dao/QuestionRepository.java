package com.filmwiseapp.filwiseapi.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import com.filmwiseapp.filwiseapi.model.Film;
import com.filmwiseapp.filwiseapi.model.Question;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class QuestionRepository {
    
    @PersistenceContext
    private EntityManager entityManager;


    public List<Question> findAll() {

        String sql = "SELECT * FROM Question";

        return (List<Question>) entityManager.createNativeQuery(sql, Question.class).getResultList();
    }

    
    @Transactional
    public void updateQuestion(Question question) {
        //merge se encarga de hacer el UPDATE de todos los campos basándose en el ID
        entityManager.merge(question); 
    } 

    @Transactional
    public void deleteQuestion(@RequestBody Question question) {
        //si borramos una pregunta también debemos borrar sus respuestas
        String sql = "DELETE FROM Answer WHERE QUESTION_ID =" + question.getId();

        String sql2 = "DELETE FROM Question WHERE id =" + question.getId();

        entityManager.createNativeQuery(sql).executeUpdate();
        entityManager.createNativeQuery(sql2).executeUpdate();
    }
}
