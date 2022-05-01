import { validateSMSRequest } from './../util/requestValidator';
import express, { Request, Response } from 'express';
import { ResMsg } from '../util';
import { getAll, inBoundSMS, outBoundSMS } from '../services/index';

type CustomRequest = Request & { [key:string]: any }

export const index: any = async (req: Request, res: Response) => {
    return await getAll(res, req.query);
}

export const processInboundSMS: any = async (req: CustomRequest, res: Response) => {
    const result = await validateSMSRequest(req.body);
    if(result.status === false) return ResMsg(res, 400, result.message, '');

    return await inBoundSMS(res, req.body, req.decoded);
}

export const processOutboundSMS: any = async (req: CustomRequest, res: Response) => {
    const result = await validateSMSRequest(req.body);
    if(result.status === false) return ResMsg(res, 400, result.message, '');

    return await outBoundSMS(res, req.body, req.decoded);
}