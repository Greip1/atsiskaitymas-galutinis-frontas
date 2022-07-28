import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../helper/utils';
import MyAnswersCard from './MyAnswersCard';

function MyAnswersCardList() {
  const [answers, setAnswers] = useState([]);
  const { user_id } = useParams();
  const getAllAnswers = async () => {
    const response = await fetch(`${baseUrl}/answers/user/${user_id}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setAnswers(data);
    }
  };
  useEffect(() => {
    getAllAnswers();
  }, []);

  return (
    <div>
      {answers.map((q) => (
        <MyAnswersCard key={q.a_id} {...q} />
      ))}
    </div>
  );
}

export default MyAnswersCardList;
