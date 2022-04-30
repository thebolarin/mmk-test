import express, { Request, Response } from 'express';
import PhoneNumber from '../database/models/phoneNumber';
import { ResMsg } from './../util/index';
import Account from "../database/models/account";
import redis from '../config/redis-client';
import redisKeys from '../config/redis-key-gen';
const client = redis.getClient();

type Data = {
    to: string,
    from: string,
    text: string
}

type AccountData = {
    id: number,
    auth_id: string,
    username: string,
    phone_number: any[]
}

export const getAll: any = async (res: any, data: Data) => {
    try {
        const accounts = await Account.findAll({
            where: {},
            include: [{
                model: PhoneNumber,
                as: 'phone_number',
            }],
        });

        return ResMsg(res, 201, '', accounts);
    }
    catch (err) {
        console.log(err)
        return ResMsg(res, 500, 'Invalid Request');
    }
};

export const inBoundSMS: any = async (res: Response, data: Data, account:AccountData) => {
    const { to, from, text } = data;
    try {
        let obj = account.phone_number.find((o:Record<any, unknown>) => o.number === to);   
        if(!obj) return ResMsg(res, 400, 'to parameter not found', '');

        if(text.includes("STOP")){
            const keyId = redisKeys.getKey(`STOP_${from}_${to}`);
            const result = await client.get(keyId);
            if(result) return ResMsg(res, 200, '', 'inbound sms ok');
            else{
                await client.set(keyId, JSON.stringify(data));
                await client.expire(`keyId`, 60 * 60 * 4);
            }
        }
       
        return ResMsg(res, 200, '', 'inbound sms ok');
    }
    catch (error) {
        return ResMsg(res, 500, 'unknown failure');
    }
};

export const outBoundSMS: any = async (res: Response, data: Data, account:AccountData) => {
    const { to, from, text } = data;
    try {
        let obj = account.phone_number.find((o:Record<any, unknown>) => o.number === from);   
        if(!obj) return ResMsg(res, 400, 'from parameter not found');

        const keyId = redisKeys.getKey(`STOP_${from}_${to}`);
        
        const result = await client.get(keyId);

        if(result) return ResMsg(res, 400, `sms from ${from} to ${to} blocked by STOP request`, '');
       
        return ResMsg(res, 200, '', 'outbound sms ok');
    }
    catch (error) {
        return ResMsg(res, 500, 'unknown failure');
    }
};