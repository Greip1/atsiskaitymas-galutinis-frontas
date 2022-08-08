import React, { useState } from 'react';
import css from './MyAnswers.module.css';

function MyAnswersCard({
  questionPr,
  questionTitlePr,
  q_id,
  a_id,
  answer,
  onDelete,
  onEdit,
  isEditedA,
  a_timestamp,
}) {
  const [isEditOn, setIsEditOn] = useState(false);
  const [editedText, setEditedText] = useState(answer);

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
        <h3>{questionPr}</h3>
        <p>{questionTitlePr}</p>
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
