import { useState, useEffect, useContext } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import avatar from '../img/avatar.jpg';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/authContext';

const TerminateVoteForEmployeeCard = ({ employee }) => {
  const authContext = useContext(AuthContext);
  const { register, errors, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [years, setYears] = useState([]);

  useEffect(() => {
    const next50Years = () => {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 50 }, (_, i) => currentYear + i);
    }
    setYears(next50Years());
  }, []);

  const onSubmit = () => {
      fetch(`http://localhost:3006/votes/${employee.id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`,
              },
            })
              .then((res) => res.json())
              .then(() => {
                alert('Успешно прекратихте гласуване');
                navigate('/votes');
              })
              .catch((err) =>
               alert('Нещо се обърка')
            );
   
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
          <CardMedia
            sx={{ height: 170, backgroundSize: 'contain' }}
            image={avatar}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {employee.name}
            </Typography>
            <Typography variant="body2">
              {employee.date_of_birth}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              За {employee.year} година
            </Typography>
          </CardContent>
          <CardActions>
            <Button type="submit" size="large" variant="contained">Прекрати гласуване</Button>
          </CardActions>
        </Card>
      </form >
    </>);
};

export default TerminateVoteForEmployeeCard;