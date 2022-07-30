import React from 'react';

function MyAnswersCard({ a_id, answer, onDelete }) {
  return (
    <div>
      <p>{answer}</p>
      <button>Edit</button>
      <button onClick={() => onDelete(a_id)}>Delete</button>
    </div>
  );
}

export default MyAnswersCard;
