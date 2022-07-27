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

  const login = (gotToken) => {
    setToken(gotToken);
    localStorage.setItem('login-token', gotToken);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('login-token');
  };

  const ctx = {
    login,
    logout,
    isUserLoggedIn: !!token,
    token,
  };
  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuthCtx = () => {
  return useContext(AuthContext);
};
