import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import AnswersCard from './AnswersCard';
import css from './Answers.module.css';

function AnswersCardList() {
  const { isUserLoggedIn, logout } = useAuthCtx();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);

  const { q_id } = useParams();
  console.log('q_id from params', q_id);
  console.log(useParams());

  const getQuestion = async () => {
    const response = await fetch(`${baseUrl}/questions/${q_id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  };
  const getAllAnswers = async () => {
    const response = await fetch(`${baseUrl}/questions/${q_id}/answers`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setAnswers(data);
    }
  };

  useEffect(() => {
    getQuestion();
    getAllAnswers();
  }, []);
  return (
    <div className={css.container}>
      <div className={css.buttonContainer}>
        {isUserLoggedIn && (
          <Link to={`/questions/${q_id}/answer/add`}>
            {' '}
            <button>Add new answer</button>
          </Link>
        )}
        <Link to={`/main`}>
          {' '}
          <button>Go back</button>
        </Link>
      </div>

      <div className={css.questionContainer}>
        {question.length > 0 ? (
          <div className={css.quesContainer}>
            <h2 className={css.questionTitle}>{question[0].q_title}</h2>
            <h3 className={css.question}>{question[0].question}</h3>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className={css.answersContainer}>
        <p className={css.answerNumber}>
          {' '}
          {answers.length === 1
            ? `${answers.length} answer`
            : `${answers.length} answers`}
        </p>
        {answers.length < 1 ? (
          <div className={css.noQuestions}>
            <h3>There ar no answers to this question yet</h3>
            {isUserLoggedIn && (
              <Link to={`/questions/${q_id}/answer/add`}>
                {' '}
                <p>
                  Be the first to <strong>answer</strong> this question
                </p>
              </Link>
            )}
          </div>
        ) : (
          answers.map((ob) => <AnswersCard key={ob.a_id} {...ob} />)
        )}
      </div>
    </div>
  );
}

export default AnswersCardList;
