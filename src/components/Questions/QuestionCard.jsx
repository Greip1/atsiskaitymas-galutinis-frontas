import css from './QuestionCard.module.css';
import React from 'react';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl } from '../../helper/utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuestionCard({ q_title, q_id, question, onClick }) {
  const { isUserLoggedIn, logout } = useAuthCtx();
  const [answers, setAnswers] = useState([]);
  // =======

  const getAllAnswers = async () => {
    const response = await fetch(`${baseUrl}/questions/${q_id}/answers`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setAnswers(data);
    }
  };
  useEffect(() => {
    getAllAnswers();
  }, []);
  // =======
  function clickHandler() {
    console.log('this is id from clickHandler', q_id);
    onClick !== undefined && onClick(q_id);
  }

  return (
    <>
      {/* q.isEdited && 
            <>
              <p>Edited</p>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </> */}
      <div className={css.card}>
        {isUserLoggedIn && (
          <div className={css.iconContainer}>
            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            <i className="fa fa-thumbs-down" aria-hidden="true"></i>
          </div>
        )}
        <div>
          <Link to={`/questions/${q_id}/answer`}>
            <h3 onClick={clickHandler} className={css.title}>
              {q_title}
            </h3>
          </Link>

          <div className={css.line} />
          <p className={css.description}>{question}</p>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
