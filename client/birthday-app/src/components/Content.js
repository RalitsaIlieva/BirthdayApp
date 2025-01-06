import { Routes, Route } from "react-router-dom";
import Home from './Home';
import CreateVote from './CreateVote';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Content = () => {
    const authContext = useContext(AuthContext);
    return (
        <Routes>
            {authContext.isLoggedIn && (
                <Route path='/home' element={<Home />} />
            )}
            {authContext.isLoggedIn && (
                <Route path='/new' element={<CreateVote />} />
            )}
        </Routes>)
}

export default Content;