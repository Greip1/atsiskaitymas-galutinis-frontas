import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import QuestionCardList from '../../components/Questions/QuestionCardList';
import { useAuthCtx } from '../../store/authContext';
import css from './MainPage.module.css';

function MainPage() {
  const { isUserLoggedIn } = useAuthCtx();

  return (
    <div className={css.mainCont}>
      {/* <h2>Below you can see all the questions</h2> */}
      <div className={css.cont}>
        {/* <h3 className={css.askQuestion}>Do you want to ask a question? </h3> */}
        {isUserLoggedIn && (
          <div>
            <Link className={css.link} to={'/addQ'}>
              <button className="askBtn">Ask a new question</button>
            </Link>
          </div>
        )}
      </div>
      <h1>Welcome to Pets Talk</h1>
      <QuestionCardList />;
      <Footer />
    </div>
  );
}

export default MainPage;
