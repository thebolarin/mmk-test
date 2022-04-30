import { checkLimit } from './../middlewares/limit';
import { checkAuth } from './../middlewares/auth';
import express from 'express'
import { index, processInboundSMS, processOutboundSMS } from '../controllers/account'

const Router = express.Router();

Router.get('/', index);
Router.post('/inbound/sms', checkAuth, processInboundSMS);
Router.post('/outbound/sms', checkAuth, checkLimit, processOutboundSMS);


export default Router;