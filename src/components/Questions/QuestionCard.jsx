import css from './QuestionCard.module.css';
import React from 'react';

function QuestionCard({ q_title, question }) {
  return (
    <div className={css.card}>
      <h3 className={css.title}>{q_title}</h3>
      <div className={css.line} />
      <p className={css.description}>{question}</p>
    </div>
  );
}

export default QuestionCard;
