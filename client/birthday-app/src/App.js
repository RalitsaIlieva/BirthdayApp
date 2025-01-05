import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AuthContext,
  getToken,
  extractUser,
  createSetLoginState,
  createLogout,
} from './context/authContext';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import CreateVote from './components/CreateVote';

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
          <Routes>
              <Route path='/' exact element={<LoginPage />} />
            {authValue.isLoggedIn && (
              <Route path='/home' element={<Home />} />
            )}
             {authValue.isLoggedIn && (
              <Route path='/new' element={<CreateVote />} />
            )}
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
