import { Link } from 'react-router-dom';

export default function NotLoggedPage() {
  return (
    <div className="formContainer center">
      <h2>Please login, so you can see all our features</h2>
      <Link to={'/login'}>
        <button>Login</button>
      </Link>
    </div>
  );
}
