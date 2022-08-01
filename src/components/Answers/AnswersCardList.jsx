import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import AnswersCard from './AnswersCard';

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
    <div>
      <div className="questionContainer">
        {question.length > 0 ? (
          <>
            <h2 className="questionTitle">{question[0].q_title}</h2>
            <h3 className="question">{question[0].question}</h3>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {isUserLoggedIn && answers.length > 0 && (
        <Link to={`/questions/${q_id}/answer/add`}>
          {' '}
          <p>prideti nauja atsakyma</p>
        </Link>
      )}
      <div>
        {answers.length === 1 ? `${answers.length} answer` : `${answers.length} answers`}
        {answers.length < 1 ? (
          <>
            <h3>There ar no answers to this question yet</h3>
            {isUserLoggedIn && (
              <Link to={`/questions/${q_id}/answer/add`}>
                {' '}
                <p>prideti nauja atsakyma</p>
              </Link>
            )}
          </>
        ) : (
          answers.map((ob) => <AnswersCard key={ob.a_id} {...ob} />)
        )}
      </div>
    </div>
  );
}

export default AnswersCardList;