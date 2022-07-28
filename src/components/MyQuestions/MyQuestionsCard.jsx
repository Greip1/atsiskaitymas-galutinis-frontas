import React from 'react';

function MyQuestionsCard({ q_title, question }) {
  return (
    <div>
      <h2>{q_title}</h2>
      <p>{question}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default MyQuestionsCard;
