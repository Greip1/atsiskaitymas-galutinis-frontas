import React, { useState } from 'react';
import css from './MyQuestion.module.css';

function MyQuestionsCard({
  q_title,
  question,
  q_id,
  onEdit,
  onDelete,
  isEdited,
  q_timestamp,
  isEditedQ,
}) {
  const [isEditOn, setIsEditOn] = useState(false);
  const [editedText, setEditedText] = useState(question);

  function questionEdit() {
    if (isEditOn === false) {
      setIsEditOn(true);
      return;
    }
    if (isEditOn === true) {
      setIsEditOn(false);
      onEdit(q_id, editedText);
    }
  }

  //
  return (
    <div className={css.card}>
      <div className={css.textCont}>
        <h2 className={css.titleQ}>{q_title}</h2>
        {!isEditOn && <p>{question}</p>}
        {isEditOn && (
          <input
            className={css.inputEdit}
            type="text"
            onChange={(event) => setEditedText(event.target.value)}
            value={editedText}
          />
        )}
        <div className={css.btnCont}>
          <button onClick={questionEdit}>Edit</button>
          <button onClick={() => onDelete(q_id)}>Delete</button>
        </div>{' '}
      </div>

      <div className={css.data}>
        <p>{new Date(q_timestamp).toLocaleString()}</p>
        {isEdited ? (
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

export default MyQuestionsCard;
