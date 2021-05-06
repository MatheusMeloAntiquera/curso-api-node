import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import 'express-async-errors';
import '@shared/typeorm';
import errorHandler from './errorHandler';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

app.use(errorHandler);

app.listen(3000);
