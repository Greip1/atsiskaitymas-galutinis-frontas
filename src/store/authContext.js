import { useContext, useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: null,
  username: '',
  user_id: '',
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('login-token'));
  const [username, setUsername] = useState(localStorage.getItem('login-username'));
  const [user_id, setUser_id] = useState(localStorage.getItem('login-userId'));

  const login = (gotToken, gotUsername, gotUserId) => {
    setToken(gotToken);
    localStorage.setItem('login-token', gotToken);
    setUsername(gotUsername);
    localStorage.setItem('login-username', gotUsername);
    setUser_id(gotUserId);
    localStorage.setItem('login-userId', gotUserId);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('login-token');
    setUsername('');
    localStorage.removeItem('login-username');
    setUser_id('');
    localStorage.removeItem('login-userId');
  };

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
    username,
    user_id,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthCtx = () => {
  return useContext(AuthContext);
};
