import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Personal.module.css';
import Footer from '../../components/Footer/Footer';

function PersonalPage() {
  const { token, username, user_id } = useAuthCtx();
  console.log('token', token);
  console.log('user_id', user_id);

  return (
    <div className={css.container}>
      <h1>
        {' '}
        Good to see you back, <span>{username}</span> !
      </h1>

      <div className={css.persContainer}>
        <div className={css.personal}>
          <Link to={`/personal/questions/${user_id}`}>
            <h2 className={css.my}>My questions</h2>
          </Link>
          <Link to={`/personal/answers/${user_id}`}>
            <h2 className={css.my}>My answers</h2>
          </Link>{' '}
        </div>
        <div className={css.othersContainer}>
          <div className={`${css.flex} ${css.hover}`}>
            <i className="fa fa-user" aria-hidden="true"></i>
            <h3>Edit Profile</h3>
          </div>
          <div className={`${css.flex} ${css.hover}`}>
            <i className="fa fa-lock" aria-hidden="true"></i> <h3>Change password</h3>
          </div>
          <div className={`${css.flex} ${css.hover}`}>
            <i className="fa fa-envelope" aria-hidden="true"></i> <h3>Unsubscribe</h3>
          </div>
          <div className={`${css.flex} ${css.hover}`}>
            <i className="fa fa-trash" aria-hidden="true"></i> <h3>Delete account</h3>
          </div>

          <div className={css.bottom}>
            <p className={css.hover}>FAQ</p>
            <div className={css.icons}>
              <p>Meet us on Social</p>
              <i className="fa fa-facebook-square" aria-hidden="true"></i>
              <i className="fa fa-twitter-square" aria-hidden="true"></i>
              <i className="fa fa-tumblr-square" aria-hidden="true"></i>{' '}
              <i class="fa fa-instagram" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalPage;
