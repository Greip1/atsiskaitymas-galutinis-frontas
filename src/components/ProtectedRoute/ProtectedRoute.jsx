import { Route } from 'react-router';
import NotLoggedPage from '../../pages/NotLoggedPage/NotLoggedPage';
import { useAuthCtx } from '../../store/authContext';

function ProtectedRoute(props) {
  const { isUserLoggedIn } = useAuthCtx();
  const { children, ...rest } = props;
  return <Route {...rest}>{isUserLoggedIn ? children : <NotLoggedPage />}</Route>;
}

export default ProtectedRoute;
