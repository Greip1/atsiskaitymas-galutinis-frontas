import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import MyQuestionsCard from './MyQuestionsCard';
import css from './MyQuestion.module.css';

function MyQuestionsCardList() {
  const { token } = useAuthCtx();

  const [question, setQuestion] = useState([]);
  const [error, setError] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  const { user_id } = useParams();
  const getAllAnswers = async () => {
    const response = await fetch(`${baseUrl}/questions/user/${user_id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  };
  useEffect(() => {
    getAllAnswers();
  }, []);

  console.log('question', question);

  async function handleUpdate(q_id, updatedQuestion) {
    console.log('handleUpdateTodo called in TodoApp', q_id, updatedQuestion);

    const upd = question.map((tObj) => {
      if (tObj.q_id === q_id) {
        console.log('updatedQuestion', updatedQuestion);

        return { ...tObj, question: updatedQuestion };
      }
      return { ...tObj };
    });
    setQuestion(upd);
    console.log('upd', upd);
    fetchEditedQ(q_id, updatedQuestion);
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
    console.log('response', response);
    const data = await response.json();
    console.log('data', data);
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  }
  async function deleteFetch(q_id) {
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
    <>
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
          <h2>
            All your questions below
            <p>({question.length})</p>
          </h2>
          {question.length > 0 ? (
            question.map((qOb) => (
              <MyQuestionsCard
                key={qOb.q_id}
                onEdit={handleUpdate}
                // fetchEditedQ={fetchEditedQ}
                {...qOb}
                onDelete={deleteFetch}
              />
            ))
          ) : (
            <p>There ar no questions yet</p>
          )}
        </div>
      )}
    </>
  );
}

export default MyQuestionsCardList;
