import css from './QuestionCard.module.css';
import React from 'react';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl } from '../../helper/utils';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function QuestionCard({
  q_title,
  q_id,
  question,
  onClick,
  q_dislikes,
  q_likes,
  addLike,
  minusLike,
  q_timestamp,
  answersNr,
}) {
  const { isUserLoggedIn, logout } = useAuthCtx();
  // const [like, setLike] = useState([answers]);
  // =======

  // const getAllLikes = async () => {
  //   const response = await fetch(`${baseUrl}/questions/${q_id}/answers`);
  //   const data = await response.json();
  //   if (Array.isArray(data)) {
  //     setAnswers(data);
  //   }
  // };

  const dataNormal = new Date({ q_timestamp }).toLocaleString();
  //
  // SORTINGGGGGGG

  // useEffect(() => {
  // }, []);
  // =======
  // console.log('answers', answers);
  return (
    <>
      {/* q.isEdited && 
            <>
              <p>Edited</p>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </> */}
      <div className={css.card}>
        <div className={css.likesContainer}>
          {isUserLoggedIn && (
            <div className={css.iconContainer}>
              <i onClick={addLike} className="fa fa-thumbs-up" aria-hidden="true"></i>
              <i onClick={minusLike} className="fa fa-thumbs-down" aria-hidden="true"></i>
            </div>
          )}{' '}
          <p>votes: {q_likes}</p>
          <p>answers: {answersNr}</p>
        </div>
        <div>
          <Link to={`/questions/${q_id}/answer`}>
            <h3 className={css.title}>{q_title}</h3>
          </Link>

          <div className={css.line} />
          <p className={css.description}>{question}</p>
        </div>
        <div className={css.dataContainer}>
          <p>{new Date(q_timestamp).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
