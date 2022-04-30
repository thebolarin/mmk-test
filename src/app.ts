import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { config } from 'dotenv';
import Router from './routes/index'

config();

const app = express();

app.set('trust proxy', true);
app.set("port", process.env.PORT || 3000);
app.use(json());

app.use('/api', Router);

app.use(function(req, res, next){
    res.status(405).send({ error: 'Not found' });
    return
});

export { app };
