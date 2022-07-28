import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import MyQuestionsCard from './MyQuestionsCard';

function MyQuestionsCardList() {
  const [question, setQuestion] = useState([]);
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

  return (
    <div>
      {question.map((qOb) => (
        <>
          <MyQuestionsCard key={qOb.q_id} {...qOb} />
        </>
      ))}
    </div>
  );
}

export default MyQuestionsCardList;
