import express from 'express'
import accountRoutes from '../routes/account';
import authRoutes from '../routes/auth';

const Router = express.Router()

type Indexed = {
    [key: string]: any;
};

Router.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Test app is ok!!!'
    });
});

Router.use('/account', accountRoutes);
Router.use('/auth', authRoutes);

export default Router


