import { createContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const createSetLoginState = (setLoginState) => (token) => {
  localStorage.setItem('token', token);
  setLoginState({
    token: token,
    user: extractUser(token),
    isLoggedIn: !!extractUser(token),
  });
};

export const createLogout = (logout) => () => {
  localStorage.removeItem('token');
  logout({
    isLoggedIn: false,
    user: null,
    token: getToken(),
  });
};

export const getToken = () => {
  const token = localStorage.getItem('token');

  return token ? validateToken(token) : '';
};

export const extractUser = (token) => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const validateToken = (token) => {
  if (!token) {
    return;
  }
  const timeToExp = jwtDecode(token).exp * 1000;

  return new Date() < new Date(timeToExp) ? token : '';
};

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  token: getToken(),
  logout: () => {},
  setLoginState: () => {},
});


