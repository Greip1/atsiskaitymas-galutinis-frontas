import React from 'react';

function MyAnswersCard({ q_title, answer }) {
  return (
    <div>
      <p>{answer}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
}

export default MyAnswersCard;
