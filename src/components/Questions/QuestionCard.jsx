import css from './QuestionCard.module.css';
import React from 'react';
import { useAuthCtx } from '../../store/authContext';
import { Link } from 'react-router-dom';

function QuestionCard({
  q_title,
  q_id,
  question,
  q_likes,
  addLike,
  minusLike,
  q_timestamp,
  answersNr,
  isEdited,
}) {
  const { isUserLoggedIn } = useAuthCtx();

  return (
    <>
      <div className={css.card}>
        <div className={css.likesContainer}>
          {isUserLoggedIn && (
            <div className={css.iconContainer}>
              <i
                onClick={addLike}
                className="fa fa-thumbs-up like"
                aria-hidden="true"
              ></i>
              <i
                onClick={minusLike}
                className="fa fa-thumbs-down dislike"
                aria-hidden="true"
              ></i>
            </div>
          )}{' '}
          <p>votes: {q_likes}</p>
          <p>answers: {answersNr}</p>
        </div>
        <div className={css.questionContainer}>
          <Link to={`/questions/${q_id}/answer`}>
            <h3 className={css.title}>{q_title}</h3>
          </Link>

          <div className={css.line} />
          <p className={css.description}>{question}</p>
        </div>
        <div className={css.dataContainer}>
          <p className={css.edited}>{isEdited ? 'created' : 'edited'}</p>

          <p>{new Date(q_timestamp).toLocaleString()}</p>
        </div>
      </div>
    </>
  );
}

export default QuestionCard;
