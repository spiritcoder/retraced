import express from 'express';
import { json } from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

// //require those routes which I created seperately
import { apiRoutess } from './routes/api';
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express();
app.set('trust proxy', true)
app.use(json());



//Routes imported here
app.use('/api', apiRoutess);

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)


export {app}