import { useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from "../Header.js";
import { AuthContext } from '../../context/authContext';
import CreateVoteTab from "../CreateVoteTab.js";
import ActiveVotesTab from "../ActiveVotesTab";
import TerminateVotesTab from "../TerminateVotesTab";
import FinishedVotesTab from "../FinishedVotesTab";
import LoginPage from '../LoginPage.js';
import NotFoundPage from '../NotFoundPage.js';

const Layout = () => {
  const authContext = useContext(AuthContext);

  return (
    <>
      {authContext.isLoggedIn && <Header />}
      <Routes>
        {!authContext.isLoggedIn && <Route path="/" element={<LoginPage />} />}
        {authContext.isLoggedIn && (
          <>
            <Route path="/" element={<ActiveVotesTab />} />
            <Route path="/new" element={<CreateVoteTab />} />
            <Route path="/votes" element={<ActiveVotesTab />} />
            <Route path="/myvotes" element={<TerminateVotesTab />} />
            <Route path="/finished" element={<FinishedVotesTab />} />
          </>
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Layout;