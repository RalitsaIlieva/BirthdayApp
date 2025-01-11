import { Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import CreateVoteTab from "./CreateVoteTab";
import ActiveVotesTab from "./ActiveVotesTab";
import TerminateVotesTab from "./TerminateVotesTab";
import FinishedVotesTab from "./FinishedVotesTab";
import LoginPage from "./LoginPage";

const Content = () => {
    const authContext = useContext(AuthContext);
    return (
        <Routes>
            <Route path='/' exact element={<LoginPage />} />
            {authContext.isLoggedIn && (
                <Route path='/new' element={<CreateVoteTab />} />
            )}
            {authContext.isLoggedIn && (
                <Route path='/votes' element={<ActiveVotesTab />} />
            )}
            {authContext.isLoggedIn && (
                <Route path='/myvotes' element={<TerminateVotesTab />} />
            )}
            {authContext.isLoggedIn && (
                <Route path='/finished' element={<FinishedVotesTab />} />
            )}
        </Routes>)
}

export default Content;