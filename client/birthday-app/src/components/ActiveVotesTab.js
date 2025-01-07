import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../context/authContext';
import GiftVoteForEmployeeCard from "./GiftVoteForEmployeeCard";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const ActiveVotesTab = () => {
    const authContext = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3006/employees/votes`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((res) => Promise.all([res.status, res.json()]))
            .then(([status, data]) => {
                if (status === 404) {
                    return Promise.reject(data.message);
                }
                return data;
            })
            .then((data) => setEmployees(data))
            .catch((e) => alert(e));
    }, [authContext.token]);

    useEffect(() => {
        fetch(`http://localhost:3006/gifts`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((res) => Promise.all([res.status, res.json()]))
            .then(([status, data]) => {
                if (status === 404) {
                    return Promise.reject(data.message);
                }
                return data;
            })
            .then((data) => setGifts(data.map((gift) => Object.values(gift)[0])))
            .catch((e) => alert(e));
    }, [authContext.token]);

if (!employees.length || !gifts.length) return <CircularProgress />;

    return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
                        {employees && employees.map((e, index) => <Grid item xs={2} sm={4} md={4} key={index}> <GiftVoteForEmployeeCard employee={e} />
                        </Grid>)}
                    </Grid>
                </Box>
            </>
        )
};

export default ActiveVotesTab;