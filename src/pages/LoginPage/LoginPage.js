import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginPage() {
  const history = useHistory();

  function handleSuccessLogin() {
    history.replace('/main');
  }
  return (
    <div>
      <LoginForm onSuccessLogin={handleSuccessLogin} />
      <Footer />
    </div>
  );
}

export default LoginPage;
