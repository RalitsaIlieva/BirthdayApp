import React, {useEffect, useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/authContext';

const CreateVote = () => {
        const authContext = useContext(AuthContext);
    
  const { register, errors, handleSubmit } = useForm();
const [employees, setEmployees] = useState();
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
  console.log(employees)
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

  return (
    <>
      <form
        // onSubmit={handleSubmit(createVote)}
      >
        {/* <Container>
          <Row>
            <Container>
              <h4>Създай гласуване за следния служител:</h4>
            </Container>
          </Row>
          <Row>
            <input
              ref={register({ minLength: 2, required: true })}
              name='name'
              type='text'
              placeholder='Име на категорията: '
            />
          </Row>
          <br />
            <Button size='sm' type='submit'>
              Създай
            </Button>
        </Container> */}
      </form>
    </>
  );
};

export default CreateVote;