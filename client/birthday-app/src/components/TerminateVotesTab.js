import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from '../context/authContext';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TerminateVoteForEmployeeCard from "./TerminateVoteForEmployeeCard";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

const TerminateVotesTab = () => {
    const authContext = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const alertShownRef = useRef(false); 

    useEffect(() => {
    
        fetch(`http://localhost:3006/employees/votes/${authContext.user.id}`, {
            headers: {
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((res) => Promise.all([res.status, res.json()]))
            .then(([status, data]) => {
                if (status === 400) {
                    if (!alertShownRef.current) {
                        alert(data.message);  
                        alertShownRef.current = true;  
                    }
                    navigate('/votes');
                } else {
                    setEmployees(data); 
                }
            })
            .catch((e) => alert(e));
    }, [authContext.token]);

    if (!employees || !employees.length) return <CircularProgress />;

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
                    {employees && employees.map((e, index) => <Grid item xs={2} sm={4} md={4} key={index}> <TerminateVoteForEmployeeCard employee={e} />
                    </Grid>)}
                </Grid>
            </Box>
        </>
    )
};

export default TerminateVotesTab;