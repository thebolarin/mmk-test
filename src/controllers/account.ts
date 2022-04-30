import express, { Request, Response } from 'express';
import { check, validationResult } from "express-validator";
import { ResMsg } from '../util';
import { getAll, inBoundSMS, outBoundSMS } from '../services/index';

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
      return {
        msg: error.msg,
      };
    },
  });

type Indexed = {
    [key: string]: any;
};

export const index: any = async (req: Request, res: Response) => {
    return await getAll(res, req.query);
}

export const processInboundSMS: any = async (req: Indexed, res: Response) => {
    await check("from", "From is invalid").not().isEmpty().withMessage('From is missing').isString().isLength({ min: 6,max: 16 }).run(req);
    await check("to", "To is invalid").not().isEmpty().withMessage('to is missing').isString().isLength({ min: 6,max: 16 }).run(req);
    await check("text", "Text is invalid").not().isEmpty().withMessage('text is missing').isString().isLength({ min: 1,max: 120 }).run(req);

    const errors = myValidationResult(req);

    if (!errors.isEmpty()) {
        return ResMsg(res, 400, errors.array(), '');
    }

    return await inBoundSMS(res, req.body, req.decoded);
}

export const processOutboundSMS: any = async (req: Indexed, res: Response) => {
    await check("from", "Provide a valid from data").not().isEmpty().isString().isLength({ min: 6,max: 16 }).withMessage('must be 6-16 chars long').run(req);
    await check("to", "Provide a valid to data").not().isEmpty().isString().isLength({ min: 6,max: 16 }).run(req);
    await check("text", "Provide a valid text data").not().isEmpty().isString().isLength({ min: 1,max: 120 }).run(req);

    const errors = myValidationResult(req);

    if (!errors.isEmpty()) {
        return ResMsg(res, 400, errors.array(), '');
    }

    return await outBoundSMS(res, req.body, req.decoded);
}