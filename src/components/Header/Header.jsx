import { NavLink } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import css from './Header.module.css';

function Header() {
  const { isUserLoggedIn, logout } = useAuthCtx();

  return (
    <header className={css.header}>
      <div className={css.img}>
        <img className={css.logo} src="/logo.png" alt="Logo" />
        <h3 className={css.text}>PETS TALK</h3>
      </div>

      <nav className={css.nav}>
        <NavLink className="nav-link" to="/main">
          Main
        </NavLink>

        {isUserLoggedIn && (
          <NavLink className="nav-link" to="/personal">
            My Personal Space
          </NavLink>
        )}

        {!isUserLoggedIn && (
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        )}
        {!isUserLoggedIn && (
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        )}

        {isUserLoggedIn && (
          <NavLink onClick={logout} className="nav-link" to="/login">
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
