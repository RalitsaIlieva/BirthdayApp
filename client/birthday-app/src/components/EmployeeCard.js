import { useState, useEffect, useContext } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import avatar from '../img/avatar.jpg';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import { AuthContext } from '../context/authContext';

const EmployeeCard = ({ employee }) => {
  const authContext = useContext(AuthContext);
  const { register, errors, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [years, setYears] = useState([]);
  const [year, setYear] = useState('');
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3006/votes`, {
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

  const handleChange = (event) => {
    setYear(event.target.value);
  };
  useEffect(() => {
    const next50Years = () => {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 50 }, (_, i) => currentYear + i);
    }
    setYears(next50Years());
  }, []);
  const onSubmit = (data) => {
    const payload = {year: data.year, user: authContext.user, employeeId: employee}
      fetch(`http://localhost:3006/votes`, {
              method: 'POST',
              body: JSON.stringify(payload),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`,
              },
            })
              .then((res) => res.json())
              .then((createdVote) => {
                console.log(createdVote)
                setVotes((votes) => [...votes, createdVote[0]]);
                alert('Успешно добавихте ново гласуване')
              })
              .catch((err) =>
               alert('Това гласуване вече е добавено')
            );
   
  };
  const createVote = (data) => {
    //     fetch(`${BASE_URL}/categories`, {
    //       method: 'POST',
    //       body: JSON.stringify(data),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${authContext.token}`,
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((createdCategory) => {
    //         setCategories((categories) => [...categories, createdCategory[0]]);
    //         toast.success('Успешно добавихте нова категория', {
    //           position: toast.POSITION.TOP_CENTER,
    //         });
    //       })
    //       .catch((err) =>
    //         toast.warn('Тази категория вече е добавена', {
    //           position: toast.POSITION.TOP_CENTER,
    //         })
    //       );
    //   };
  }
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
            <Controller
              name="year"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (<>
                <InputLabel>За година</InputLabel>
                <Select
                  value={value}
                  onChange={onChange}
                  sx={{ width: "100%" }}
                >
                  {years.map((year) => <MenuItem value={year}>{year}</MenuItem>)}
                </Select>
              </>
              )}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" size="large" variant="contained">Създай гласуване</Button>
          </CardActions>
        </Card>
      </form >
    </>);
};

export default EmployeeCard;