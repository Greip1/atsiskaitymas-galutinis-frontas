// import css from './AnswerCard.module.css';
import React from 'react';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl } from '../../helper/utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './Answers.module.css';

function AnswersCard({ q_id, onClick, answer }) {
  const { isUserLoggedIn, logout } = useAuthCtx();
  const [answers, setAnswers] = useState([]);
  // =======

  return (
    <div className="answers-container">
      {isUserLoggedIn && (
        <>
          <div className="icons">
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
          </div>
        </>
      )}
      <div className="answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default AnswersCard;
