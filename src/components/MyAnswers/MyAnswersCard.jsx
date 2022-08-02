import React, { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';
import css from './MyAnswers.module.css';

function MyAnswersCard({ a_id, answer, onDelete, onEdit, isEditedA, a_timestamp }) {
  const { token } = useAuthCtx();
  const [isEditOn, setIsEditOn] = useState(false);
  const [editedText, setEditedText] = useState(answer);

  if (!token) {
    alert('Session time is over.Please login');
    window.location.replace('/login');
  }
  function answerEdit() {
    if (isEditOn === false) {
      setIsEditOn(true);
      return;
    }
    if (isEditOn === true) {
      setIsEditOn(false);
      onEdit(a_id, editedText);
    }
  }
  return (
    <div className={css.card}>
      <div className={css.textCont}>
        {!isEditOn && <p>{answer}</p>}
        {isEditOn && (
          <input
            className={css.inputEdit}
            type="text"
            onChange={(event) => setEditedText(event.target.value)}
            value={editedText}
          />
        )}
        <div className={css.btnCont}>
          <button onClick={answerEdit}>Edit</button>
          <button onClick={() => onDelete(a_id)}>Delete</button>
        </div>
      </div>

      <div className={css.data}>
        <p>{new Date(a_timestamp).toLocaleString()}</p>
        {isEditedA ? (
          <div className={css.editedContainer}>
            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            <p> edited</p>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default MyAnswersCard;
