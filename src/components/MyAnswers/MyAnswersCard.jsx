import React, { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';

function MyAnswersCard({ a_id, answer, onDelete, onEdit }) {
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
    <div>
      {!isEditOn && <p>{answer}</p>}
      {isEditOn && (
        <input
          type="text"
          onChange={(event) => setEditedText(event.target.value)}
          value={editedText}
        />
      )}
      <button onClick={answerEdit}>Edit</button>
      <button onClick={() => onDelete(a_id)}>Delete</button>
    </div>
  );
}

export default MyAnswersCard;
