import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import NotLoggedPage from './pages/NotLoggedPage/NotLoggedPage';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AnswerPage from './pages/AnswerPage/AnswerPage';
import AddQuestionPage from './pages/AddQuestionPage/AddQuestionPage';
import AddAnswerPage from './pages/AddAnswerPage/AddAnswerPage';
import PersonalPage from './pages/PersonalPage/PersonalPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import MyAnswersPage from './pages/MyAnswersPage/MyAnswersPage';
import MyQuestionsPage from './pages/MyQuestionsPage/MyQuestionsPage';
// import EditQuestionPage from './pages/EditQuestionPage/EditQuestionPage';
// import EditAnswerPage from './pages/EditAnswerPage/EditAnswerPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={'/main'}>
          <MainPage />
        </Route>

        <Route path={'/register'}>
          <RegisterPage />
        </Route>

        <Route path={'/login'}>
          <LoginPage />
        </Route>

        <ProtectedRoute path={'/questions/:q_id/answer/add'}>
          <AddAnswerPage />
        </ProtectedRoute>

        <Route path={'/questions/:q_id/answer'}>
          <AnswerPage />
        </Route>

        <ProtectedRoute path={'/addQ'}>
          <AddQuestionPage />
        </ProtectedRoute>

        <ProtectedRoute path={'/personal/questions/:user_id'}>
          <MyQuestionsPage />
        </ProtectedRoute>

        <ProtectedRoute path={'/personal/answers/:user_id'}>
          <MyAnswersPage />
        </ProtectedRoute>

        <ProtectedRoute path={'/personal'}>
          <PersonalPage />
        </ProtectedRoute>

        <Route path={'*'}>
          <NotLoggedPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
