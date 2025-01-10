import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from '../context/authContext';
import GiftVoteForEmployeeCard from "./GiftVoteForEmployeeCard";
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const ActiveVotesTab = () => {
    const authContext = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();
    const alertShownRef = useRef(false); 

    useEffect(() => {
        fetch(`http://localhost:3006/employees/votes`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((res) => Promise.all([res.status, res.json()]))
            .then(([status, data]) => {
                if (status === 400) {
                    if (!alertShownRef.current) {
                        alertShownRef.current = true;  
                    }
                    navigate('/votes');
                } else {
                    setEmployees(data); 
                }
            })
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

if (!gifts.length) return <CircularProgress />;

    return (
        <>
            {!employees.length ? <Box boxShadow={3} mt={3} mb={14} pt={8} pb={8} pl={2} sx={{ backgroundColor: "white" }}>В момента няма активни гласувания</Box>
            :
                (<>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
                            {employees && employees.map((e, index) => <Grid item xs={2} sm={4} md={4} key={index}> <GiftVoteForEmployeeCard employee={e} />
                            </Grid>)}
                        </Grid>
                    </Box>
                </>)
            }
        </>
    );
};

export default ActiveVotesTab;