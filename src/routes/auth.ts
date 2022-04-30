import express from 'express'
import { index } from '../controllers/auth'

const Router = express.Router();

Router.post('/login', index);

export default Router;