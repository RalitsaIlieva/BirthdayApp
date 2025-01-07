import express from 'express';
import employeesService from '../services/employees-service.js';
// import { validator } from '../validators/validatorMiddleware.js';
// import createUserSchema from '../validators/schemas/createUserSchema.js';
import employeesData from '../data/employees-data.js';
import createToken from './../auth/create-token.js';
import { authMiddleware } from '../auth/auth-middleware.js';

const employeesController = express.Router();

employeesController
  .post('/login', async (req, res) => {
    const { username, password } = req.body;
    const employee = await employeesService.signInEmployee(employeesData)(username, password);
    if (!employee) {
      res.status(404).send({ message: 'Невалидно потребителско име/парола!' });
    } else {
      const payload = {
        id: employee.id,
        username: employee.username
      };

      const token = createToken(payload);

      res.status(200).send({
        token: token,
      });
    }
  })
  .get('/', authMiddleware, async (req, res) => {
    const username = req.user.username
    const employees = await employeesService.getEmployees(employeesData)(username);
    if (!employees) {
      return res.status(404).send([]);
    }

    res.status(200).send(employees);
  })
  .get('/votes', authMiddleware, async (req, res) => {
    const username = req.user.username
    const employees = await employeesService.getEmployeesWithActiveVotes(employeesData)(username);
    if (!employees) {
      return res.status(404).send([]);
    }

    res.status(200).send(employees);
  })
  .get('/votes/:id', authMiddleware, async (req, res) => {
    const authorId = req.params.id;
    const username = req.user.username
    const employees = await employeesService.getEmployeesWithActiveVotes(employeesData)(username, authorId);
    if (!employees) {
      return res.status(404).send([]);
    }

    res.status(200).send(employees);
  });

export default employeesController;
