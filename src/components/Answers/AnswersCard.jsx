// import css from './AnswerCard.module.css';
import React from 'react';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl } from '../../helper/utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './Answers.module.css';

function AnswersCard({ a_timestamp, answer, isEditedA, addLike, minusLike, a_likes }) {
  const { isUserLoggedIn, logout } = useAuthCtx();
  const [answers, setAnswers] = useState([]);
  // =======

  return (
    <div className={css.answersCard}>
      <div className={css.likeContainer}>
        {isUserLoggedIn && (
          <>
            <div className="icons">
              <i onClick={addLike} className="fa fa-thumbs-up" aria-hidden="true"></i>
              <i onClick={minusLike} className="fa fa-thumbs-down" aria-hidden="true"></i>
            </div>
          </>
        )}
        <p>votes: {a_likes}</p>
      </div>

      <div className={css.answerContainer}>
        <p className={css.answer}>{answer}</p>
      </div>

      <div className={css.timeCont}>
        <p className={css.editedA}>
          {isEditedA ? <i className="fa fa-pencil-square-o" aria-hidden="true"></i> : ''}
        </p>
        <p className={css.time}>{new Date(a_timestamp).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default AnswersCard;
