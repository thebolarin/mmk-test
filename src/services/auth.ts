import express, { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ResMsg } from './../util/index';
import Account from "../database/models/account";

export const login: any = async (res: Response, data: any) => {
    try {
        const account = await Account.findOne({where: {
            username: data.username,
            auth_id: data.password,
        }});

        if(!account){
            return ResMsg(res, 400, 'Username/Password is incorrect. Please try again.');
        }

        let jwtToken = await jwt.sign(JSON.parse(JSON.stringify(account)), process.env.APPLICATION_KEY, {
            expiresIn: "1h"
          });

        return ResMsg(res, 200, '', { account, jwtToken});
    }
    catch (err) {
        return ResMsg(res, 500, 'Invalid Request');
    }
};