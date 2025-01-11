import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import VoteDetails from './VoteDetails';

const FinishedVotesTab = () => {
  const [votes, setVotes] = useState([]);
  const [selectedVoteId, setSelectedVoteId] = useState(null);
  const authContext = useContext(AuthContext);

  const handleButtonClick = (voteId) => {
    setSelectedVoteId(voteId);
  };

  const handleBackButtonClick = () => {
    setSelectedVoteId(null);  
  };

  useEffect(() => {
    fetch(`http://localhost:3006/votes?finished=true`, {
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
    .then((data) => setVotes(data))
    .catch((e) => alert(e));
  }, [authContext.token]);
  
  if (!votes.length) return <CircularProgress />;

  return (!selectedVoteId ? <TableContainer
    component={Paper}
    pt={5.5}
    pb={2}
    sx={{ backgroundColor: "rgb(243 244 246)", overflowX: 'auto' }}
  >
    <Box boxShadow={3} mt={3} mb={14} pt={8} pb={8} sx={{ backgroundColor: "white", overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Рожденик</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              За година
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Подарък
            </TableCell>
            < TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {votes.map((vote) => (
            <TableRow key={vote.vote_id}>
              <TableCell component="th" scope="row">
                {vote.birthday_employee_name}
              </TableCell>
              <TableCell align="right">{vote.vote_year}</TableCell>
              <TableCell align="right">{vote.winning_gift ? vote.winning_gift : "Няма избран подарък"}</TableCell>
              <TableCell align="right"><Button size="small" variant="contained" onClick={() => handleButtonClick(vote.vote_id)}>Детайли</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </TableContainer> : <VoteDetails voteId={selectedVoteId} onBack={handleBackButtonClick}/>)
};

export default FinishedVotesTab;