import { Routes, Route } from "react-router-dom";
import Home from './Home';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import CreateVoteTab from "./CreateVoteTab";
import ActiveVotesTab from "./ActiveVotesTab";
import TerminateVotesTab from "./TerminateVotesTab";
import FinishedVotesTab from "./FinishedVotesTab";

const Content = () => {
    const authContext = useContext(AuthContext);
    return (
        <Routes>
            {authContext.isLoggedIn && (
                <Route path='/home' element={<Home />} />
            )}
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