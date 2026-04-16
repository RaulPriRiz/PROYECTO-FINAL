package com.filmwiseapp.filwiseapi.dao;

import java.util.List;
import org.springframework.stereotype.Repository;
import com.filmwiseapp.filwiseapi.model.Answer;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class AnswerRepository {

    @PersistenceContext
    private EntityManager entityManager;


    public List<Answer> findAnswers(int questionId){
        
        String sql = "SELECT * FROM ANSWER WHERE QUESTION_ID = " + questionId;

        return (List<Answer>) entityManager.createNativeQuery(sql, Answer.class).getResultList();
    }
}
