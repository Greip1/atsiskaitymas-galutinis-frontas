/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import MyQuestionsCard from './MyQuestionsCard';
import css from './MyQuestion.module.css';

function MyQuestionsCardList() {
  const { token } = useAuthCtx();
  if (!token) {
    alert('Session time is over.Please login');
    window.location.replace('/login');
  }

  const [question, setQuestion] = useState([]);
  const [error, setError] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  const { user_id } = useParams();

  const getAllQ = async () => {
    const response = await fetch(`${baseUrl}/questions/user/${user_id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  };
  useEffect(() => {
    getAllQ();
  }, []);

  async function handleUpdate(q_id, updatedQuestion) {
    const upd = question.map((tObj) => {
      if (tObj.q_id === q_id) {
        return { ...tObj, question: updatedQuestion };
      }
      return { ...tObj };
    });
    setQuestion(upd);
    const newOBj = {
      question: updatedQuestion,
    };
    fetchEditedQ(q_id, newOBj);
  }
  //
  async function fetchEditedQ(q_id, updatedQuestion) {
    const response = await fetch(`${baseUrl}/questions/${q_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedQuestion),
    });
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  }
  async function deleteFetch(q_id) {
    if (confirm('Ar tikrai norite istrinti?') === false) return;

    const response = await fetch(`${baseUrl}/questions/${q_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.succes) {
      setPostCreated(true);
    }
    setError(data.err);
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  }
  //

  return (
    <div className={css.mainContainer}>
      {postCreated ? (
        <>
          <div className={css.successMessage}>
            <p>Question was successfully deleted</p>
            <Link className={css.navLink} to={`/personal/`}>
              <button className={css.btn}>Back to your personal page</button>
            </Link>
            <Link className={css.navLink} to={`/main/`}>
              <button className={css.btn}>Back to main page</button>
            </Link>
          </div>
        </>
      ) : (
        <div>
          <h2 className={css.headerQ}>All your questions ({question.length})</h2>
          <p className={`${css.errorMsg} ${css.emailErr}`}>{error ? error : ''}</p>

          {question.length > 0 ? (
            question.map((qOb) => (
              <MyQuestionsCard
                key={qOb.q_id}
                onEdit={handleUpdate}
                {...qOb}
                onDelete={deleteFetch}
              />
            ))
          ) : (
            <p>There are no questions yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MyQuestionsCardList;
