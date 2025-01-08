import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';

const FinishedVotesTab = () => {
  const [votes, setVotes] = useState([]);
  const authContext = useContext(AuthContext);
  function countGiftOccurrences(arr) {
    const giftCounts = {};
  
    for (const item of arr) {
      const key = `${item.birthday_employee_name}-${item.gift_name}`;
      if (!giftCounts[key]) {
        giftCounts[key] = {
          birthday_employee_name: item.birthday_employee_name,
          gift_name: item.gift_name,
          number: 0
        };
      }
      giftCounts[key].number++;
    }
  
    return Object.values(giftCounts);
  }
  const result = countGiftOccurrences(votes);
  console.log(result)
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

  return (
    <BarChart width={600} height={300} data={result}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="gift_name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="number" fill="#8884d8" />
    </BarChart>
  );
};

export default FinishedVotesTab;