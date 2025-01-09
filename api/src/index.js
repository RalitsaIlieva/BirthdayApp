import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';
import employeesController from '../src/controllers/employees-controller.js';
import votesController from './controllers/votes-controller.js';
import giftsController from './controllers/gifts-controller.js';

const app = express();
passport.use(jwtStrategy);

app.use(cors(), bodyParser.json());
app.use(passport.initialize());
app.use('/employees', employeesController);
app.use('/votes', votesController);
app.use('/gifts', giftsController)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' })
);

app.listen(3006, () => console.log('Listening on port 3006'));
