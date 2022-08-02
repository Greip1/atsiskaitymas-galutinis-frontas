import React, { useState } from 'react';
import css from './MyQuestion.module.css';

function MyQuestionsCard({ q_title, question, q_id, onEdit, onDelete, isEdited }) {
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
    <div>
      <h2>{q_title}</h2>
      {!isEditOn && <p>{question}</p>}
      {isEditOn && (
        <input
          type="text"
          onChange={(event) => setEditedText(event.target.value)}
          value={editedText}
        />
      )}

      {isEdited ? (
        <div className={css.editedContainer}>
          <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
          <p> edited</p>
        </div>
      ) : (
        ''
      )}

      <button onClick={questionEdit}>Edit</button>
      <button onClick={() => onDelete(q_id)}>Delete</button>
    </div>
  );
}

export default MyQuestionsCard;
