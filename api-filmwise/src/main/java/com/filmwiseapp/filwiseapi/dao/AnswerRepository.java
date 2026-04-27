package com.filmwiseapp.filwiseapi.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import com.filmwiseapp.filwiseapi.model.Answer;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
public class AnswerRepository {

    @PersistenceContext
    private EntityManager entityManager;


    public List<Answer> findAnswers(int questionId){
        
        String sql = "SELECT * FROM ANSWER WHERE QUESTION_ID = " + questionId;

        return (List<Answer>) entityManager.createNativeQuery(sql, Answer.class).getResultList();
    }


    public List<Answer> findAll() {

        String sql = "SELECT * FROM Answer";

        return (List<Answer>) entityManager.createNativeQuery(sql, Answer.class).getResultList();
    }


    @Transactional
    public void updateAnswer(Answer answer) {
        //merge se encarga de hacer el UPDATE de todos los campos basándose en el ID
        entityManager.merge(answer); 
    } 

    @Transactional
    public void deleteAnswer(@RequestBody Answer answer) {
        String sql = "DELETE FROM Answer WHERE id =" + answer.getId();
        
        entityManager.createNativeQuery(sql).executeUpdate();
    }
}
