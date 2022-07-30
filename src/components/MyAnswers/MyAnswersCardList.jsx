import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import { useAuthCtx } from '../../store/authContext';
import MyAnswersCard from './MyAnswersCard';
import css from './MyAnswers.module.css';

function MyAnswersCardList() {
  const [answers, setAnswers] = useState([]);
  const { user_id } = useParams();
  const { token } = useAuthCtx();

  const [error, setError] = useState(false);
  const [postCreated, setPostCreated] = useState(false);

  const getAllAnswers = async () => {
    const response = await fetch(`${baseUrl}/answers/user/${user_id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setAnswers(data);
    }
    return;
  };
  async function deleteFetch(a_id) {
    const response = await fetch(`${baseUrl}/answers/${a_id}`, {
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
      setAnswers(data);
    }
  }
  useEffect(() => {
    getAllAnswers();
  }, []);

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
            <p>({answers.length})</p>
          </h2>
          {answers.length > 0 ? (
            answers.map((q) => (
              <MyAnswersCard key={q.a_id} onDelete={deleteFetch} {...q} />
            ))
          ) : (
            <p>There ar no answers yet</p>
          )}
        </div>
      )}
    </>
  );
}

export default MyAnswersCardList;
