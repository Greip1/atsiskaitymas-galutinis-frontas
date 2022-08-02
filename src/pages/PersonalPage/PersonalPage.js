import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Personal.module.css';
function PersonalPage() {
  const { token, username, user_id } = useAuthCtx();
  console.log('token', token);
  console.log('user_id', user_id);

  return (
    <div className={css.container}>
      <h1> Good to see you back, {username} !</h1>

      <div className={css.persContainer}>
        <div className={css.personal}>
          <Link to={`/personal/questions/${user_id}`}>
            <h2>My questions</h2>
          </Link>
          <Link to={`/personal/answers/${user_id}`}>
            <h2>My answers</h2>
          </Link>{' '}
        </div>
        <div className={css.othersContainer}>
          <h3>Edit Profile</h3>
        </div>
      </div>
    </div>
  );
}

export default PersonalPage;
