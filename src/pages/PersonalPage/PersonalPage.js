import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';

function PersonalPage() {
  const { token, username, user_id } = useAuthCtx();
  console.log('token', token);
  console.log('user_id', user_id);

  return (
    <div>
      <h1> Welcome back, {username}</h1>
      <Link to={`/personal/questions/${user_id}`}>
        <h2>my questions</h2>
      </Link>
      <Link to={`/personal/answers/${user_id}`}>
        <h2>my answers</h2>
      </Link>
    </div>
  );
}

export default PersonalPage;
