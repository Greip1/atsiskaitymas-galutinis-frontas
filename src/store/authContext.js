import { useContext, useState } from 'react';
import { createContext } from 'react';

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: '',
  token: null,
});

AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('login-token'));
  const [username, setUsername] = useState(localStorage.getItem('login-username'));

  const login = (gotToken, gotUsername) => {
    setToken(gotToken);
    localStorage.setItem('login-token', gotToken);
    setUsername(gotUsername);
    localStorage.setItem('login-username', gotUsername);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('login-token');
    setUsername(null);
    localStorage.removeItem('login-username');
  };

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
    username,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthCtx = () => {
  return useContext(AuthContext);
};
