import React from 'react';
import css from './QuestionCard.module.css';

import { useEffect } from 'react';
import { useState } from 'react';

import { useAuthCtx } from '../../store/authContext';
import QuestionCard from './QuestionCard';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';

function QuestionCardList() {
  const { token } = useAuthCtx();
  const [question, setQuestion] = useState([]);

  const getPosts = async () => {
    const response = await fetch(`${baseUrl}/questions`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={css.cardList}>
      {question.length > 0 ? (
        question.map((skObj) => <QuestionCard key={skObj.q_id} {...skObj} />)
      ) : (
        <>
          <div>
            <h2>There are no available questions...</h2>
            <br />

            <h3 className={css.addText}>Want to join us and ask a question? </h3>
            <h3>
              Login
              <Link className={css.link} to={'/login'}>
                HERE
              </Link>
            </h3>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionCardList;
