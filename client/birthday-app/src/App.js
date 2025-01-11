import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import {
  AuthContext,
  getToken,
  extractUser,
  createSetLoginState,
  createLogout,
} from './context/authContext';
import './App.css';
import Layout from './components/Layout';

function App() {
  const [authValue, setLoginState] = useState({
    isLoggedIn: !!extractUser(getToken()),
    user: extractUser(getToken()),
    token: getToken(),
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          ...authValue,
          setLoginState: createSetLoginState(setLoginState),
          logout: createLogout(setLoginState),
        }}
      >
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
