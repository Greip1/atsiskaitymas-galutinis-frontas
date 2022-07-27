import { Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotLoggedPage from './pages/NotLoggedPage/NotLoggedPage';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AnswerPage from './pages/AnswerPage/AnswerPage';
import AddQuestionPage from './pages/AddQuestionPage/AddQuestionPage';
import AddAnswerPage from './pages/AddAnswerPage/AddAnswerPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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

        <ProtectedRoute path={'/addQ'}>
          <AddQuestionPage />
          <Route path={'/questions/:q_id/answer'}>
            <AnswerPage />
          </Route>
        </ProtectedRoute>
        <ProtectedRoute path={'/questions/:q_id/answer/add'}>
          <AddAnswerPage />
        </ProtectedRoute>

        <Route path={'*'}>
          <NotLoggedPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
