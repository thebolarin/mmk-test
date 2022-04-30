import express from 'express'
import accountRoutes from '../routes/account';
import authRoutes from '../routes/auth';

const Router = express.Router()

type Indexed = {
    [key: string]: any;
};

Router.get('/', async(req, res) => {
    let message = 'Payment Service OK';

    if(process.env.NODE_ENV !== 'production') message = 'Payment Service Staging OK!!'

    res.status(200).send({
        message: message
    });
});

Router.use('/account', accountRoutes);
Router.use('/auth', authRoutes);

export default Router


