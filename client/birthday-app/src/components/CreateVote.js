import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/authContext';
import EmployeeCard from './EmployeeCard.js';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from './Pagination.js';
import Header from './Header.js';


const CreateVote = () => {
    const authContext = useContext(AuthContext);
   
    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:3006/employees`, {
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
            .catch((e) =>
                alert(e.message)
            );
    }, [authContext.token]);
    //   const createVote = (data) => {
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
    if (!employees) return null;
    const employeesPerPage = 3;
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = employees.slice(
        indexOfFirstEmployee,
        indexOfLastEmployee,
    );
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='center'>
                    {employees && currentEmployees.map((e, index) => <Grid item xs={2} sm={4} md={4} key={index}> <EmployeeCard employee={e} />
                    </Grid>)}
                </Grid>
                <Pagination
                    length={employees.length}
                    postsPerPage={employeesPerPage}
                    handlePagination={handlePagination}
                    currentPage={currentPage}
                />
            </Box>
        </>
    )
}
export default CreateVote;