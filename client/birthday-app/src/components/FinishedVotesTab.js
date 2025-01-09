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
  const [allEmployees, setAllEmployees] = useState([]);
  const [showVoteDetails, setShowVoteDetails] = useState(false)
  const authContext = useContext(AuthContext);
  const result = votes.reduce((acc, curr) => {
    if (!acc[curr.birthday_employee_name] || curr.gift_vote_count > acc[curr.birthday_employee_name].gift_vote_count) {
      acc[curr.birthday_employee_name] = {
        year: curr.year,
        gift_name: curr.gift_name,
        birthday_employee_name: curr.birthday_employee_name,
        gift_vote_count: curr.gift_vote_count
      };
    }
    return acc;
  }, {});

  const finalResult = Object.values(result);
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

  useEffect(() => {
    fetch(`http://localhost:3006/votes?finished=all`, {
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
      .then((data) => setAllEmployees(data))
      .catch((e) => alert(e));
  }, [authContext.token]);
  console.log(allEmployees)

  const voteDetails = () => {
    return (<VoteDetails />)
  }
  if (!votes.length) return <CircularProgress />;

  return (!showVoteDetails? <TableContainer
    component={Paper}
    pt={5.5}
    pb={2}
    sx={{ backgroundColor: "rgb(243 244 246)" }}
  >
    <Box boxShadow={3} mt={3} mb={14} pt={8} pb={8} sx={{ backgroundColor: "white" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Рожденик</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              За година
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Подарък
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Печели с брой гласове
            </TableCell>
            < TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {finalResult.map((vote) => (
            <TableRow key={vote.birthday_employee_name}>
              <TableCell component="th" scope="row">
                {vote.birthday_employee_name}
              </TableCell>
              <TableCell align="right">{vote.year}</TableCell>
              <TableCell align="right">{vote.gift_name}</TableCell>
              <TableCell align="right">{vote.gift_vote_count}</TableCell>
              <TableCell align="right"><Button size="small" variant="contained" onClick={() => setShowVoteDetails(!showVoteDetails)}>Детайли</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </TableContainer> : <VoteDetails />)
};

export default FinishedVotesTab;