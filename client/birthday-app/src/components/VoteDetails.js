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

const VoteDetails = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const authContext = useContext(AuthContext);
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

  return (
    <TableContainer
      component={Paper}
      pt={5.5}
      pb={2}
      sx={{ backgroundColor: "rgb(243 244 246)" }}
    >
      <Box boxShadow={3} mt={3} mb={14} pt={8} pb={8} sx={{ backgroundColor: "white" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Служител</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Гласувал за
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEmployees.map((vote) => (
              <TableRow key={vote.voter_name}>
                <TableCell component="th" scope="row">
                  {vote.voter_name}
                </TableCell>
                <TableCell align="right">{vote.gift_name? vote.gift_name : "Негласувал"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
};

export default VoteDetails;