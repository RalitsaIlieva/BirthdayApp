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

const GiftVoteForEmployeeCard = ({ employee }) => {
    const authContext = useContext(AuthContext);
    const { register, errors, handleSubmit, control, reset } = useForm({
        defaultValues: {
            name: ''
        }
    });
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [gift, setGift] = useState('');
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
            .then((data) => setGifts(data))
            .catch((e) => alert(e));
    }, [authContext.token]);

    const onSubmit = (data) => {
        const gift = gifts.find(gift => gift.NAME === data.name);
        const payload = { giftId: gift.Id, user: authContext.user, voteId: employee.id }
        fetch(`http://localhost:3006/votes/votes`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authContext.token}`,
            },
        })
            .then((res) => res.json())
            .then(() => {
                alert('Успешно гласувахте');
                reset({ name: '' })
            })
            .catch((err) =>
                alert('Опитайте пак')
            );
    };
    if (!employees.length || !gifts.length) return null;

    return (
        <div>
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
                            name="name"
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (<>
                                <InputLabel>Подарък</InputLabel>
                                <Select
                                    value={value}
                                    onChange={onChange}
                                    sx={{ width: "100%" }}
                                >
                                    {gifts.map((gift) => <MenuItem key={gift.NAME} value={gift.NAME}>{gift.NAME}</MenuItem>)}
                                </Select>
                            </>
                            )}
                        />
                    </CardContent>
                    <CardActions>
                        <Button type="submit" size="large" variant="contained" sx={{ margin: "0 auto" }}>Гласувай</Button>
                    </CardActions>
                </Card>

            </form >
        </div>
    );
};

export default GiftVoteForEmployeeCard;