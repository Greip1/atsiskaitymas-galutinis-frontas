import React from 'react';
import { Link } from 'react-router-dom';
import QuestionCardList from '../../components/Questions/QuestionCardList';
import { useAuthCtx } from '../../store/authContext';
import css from './MainPage.module.css';

function MainPage() {
  const { isUserLoggedIn } = useAuthCtx();

  return (
    <div>
      {isUserLoggedIn && (
        <div>
          <h3>Do you want to ask a question? </h3>
          <h3>
            <Link className={css.link} to={'/addQ'}>
              Do it HERE
            </Link>
          </h3>
        </div>
      )}
      <QuestionCardList />;
    </div>
  );
}

export default MainPage;
