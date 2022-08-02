import React from 'react';
import css from './QuestionCard.module.css';

import { useEffect } from 'react';
import { useState } from 'react';

import { useAuthCtx } from '../../store/authContext';
import QuestionCard from './QuestionCard';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';

function QuestionCardList() {
  const { token } = useAuthCtx();
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [sortAnswer, setSortAnswer] = useState([]);
  const [sortDate, setSortDate] = useState([]);
  const [sortLikes, setSortLikes] = useState([]);

  const [like, setLike] = useState([true]);
  const [dislike, setDislike] = useState([true]);

  const getAllAnswers = async () => {
    const response = await fetch(`${baseUrl}/answersAll`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setAnswers(data);
    }
  };
  function getAnswerNo(q_id) {
    const arr = answers.filter((a) => a.q_id === q_id);
    return arr.length;
  }
  const getAllQuestions = async () => {
    const response = await fetch(`${baseUrl}/questions`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestion(data);
    }
  };
  useEffect(() => {
    getAllQuestions();
    getAllAnswers();
  }, []);
  async function addLike(x, q_id) {
    const response = await fetch(`${baseUrl}/questions/addLike/${q_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('data', data);
    if (Array.isArray(data)) {
      setQuestion(data);
    }
    getAllQuestions();
    setDislike(true);
    setLike(false);
  }
  async function minusLike(x, q_id) {
    const response = await fetch(`${baseUrl}/questions/minusLike/${q_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log('data', data);
    if (Array.isArray(data)) {
      setQuestion(data);
    }
    getAllQuestions();
    setDislike(false);
    setLike(true);
  }
  //
  function sortByDate() {
    setSortDate((prev) => !prev);
    const arrCopy = [...question];
    sortDate
      ? arrCopy.sort((a, b) => new Date(a.q_timestamp) - new Date(b.q_timestamp))
      : arrCopy.sort((a, b) => new Date(b.q_timestamp) - new Date(a.q_timestamp));

    setQuestion(arrCopy);
  }
  function sortByLikes() {
    setSortLikes((prev) => !prev);
    const arrCopy = [...question];
    sortLikes
      ? arrCopy.sort((a, b) => a.q_likes - b.q_likes)
      : arrCopy.sort((a, b) => b.q_likes - a.q_likes);
    setQuestion(arrCopy);
  }
  function sortByAnswers() {
    // setSortAnswer((prev) => !prev);
    // console.log('sortDate', sortDate);
    // const arrCopy = [...question];
    // sortDate
    //   ? arrCopy.sort((a, b) => a.q_timestamp - b.q_timestamp)
    //   : arrCopy.sort((a, b) => b.q_timestamp - a.q_timestamp);
    // console.log('click arrCopy', arrCopy);
    // setSortAnswer(arrCopy);
  }

  function showAnswered() {
    const arrCopyQ = [...question];
    const arrCopyA = [...answers];
    const arrQidQ = arrCopyQ.map((ob) => ob.q_id);
    const arrQidA = arrCopyA.map((ob) => ob.q_id);

    const rightId = arrQidQ.filter((x) => arrQidA.includes(x));
    const atsqqq = arrCopyQ.filter((ob) => rightId.includes(ob.q_id));
    setQuestion(atsqqq);
    console.log('setQuestion', setQuestion);
  }
  function showNOTAnswered() {
    const arrCopyQ = [...question];
    const arrCopyA = [...answers];
    const arrQidQ = arrCopyQ.map((ob) => ob.q_id);
    const arrQidA = arrCopyA.map((ob) => ob.q_id);

    const rightId = arrQidQ.filter((x) => arrQidA.includes(x));
    const atsqqq = arrCopyQ.filter((ob) => !rightId.includes(ob.q_id));
    setQuestion(atsqqq);
    console.log('setQuestion', setQuestion);
  }
  return (
    <div className={css.container}>
      <div className={css.filterContainer}>
        <div className={css.answersContainer}>
          <p>Filtruoti klausimus:</p>
          <button onClick={showAnswered} className={css.sortBtn}>
            Atsakyti
          </button>
          <button onClick={showNOTAnswered}>Neatsakyti</button>
          <button onClick={getAllQuestions}>Visi</button>
        </div>
        <div className={css.sortByContainer}>
          <p>Sort By:</p>
          <button onClick={sortByAnswers}>Answers</button>
          <button onClick={sortByDate}>Date</button>
          <button onClick={sortByLikes}>Likes </button>
        </div>
      </div>

      <div className={css.cardList}>
        {question.length > 0 ? (
          question.map((skObj) => (
            <QuestionCard
              key={skObj.q_id}
              minusLike={() => minusLike(skObj.q_likes, skObj.q_id)}
              addLike={() => addLike(skObj.q_likes, skObj.q_id)}
              answersNr={getAnswerNo(skObj.q_id)}
              {...skObj}
            />
          ))
        ) : (
          <>
            <div>
              <h2>There are no available questions...</h2>
              <br />

              <h3 className={css.addText}>Join us and ask a question </h3>
              <h3>
                Login
                <Link className={css.link} to={'/login'}>
                  HERE
                </Link>
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionCardList;
