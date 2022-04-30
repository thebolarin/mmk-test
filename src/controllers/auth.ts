import express, { Request, Response } from 'express';
import { check, validationResult } from "express-validator";
import { ResMsg } from '../util';
import { login } from '../services/auth';

const myValidationResult = validationResult.withDefaults({
    formatter: error => {
      return {
        msg: error.msg,
      };
    },
  });
  
export const index: any = async (req: Request, res: Response) => {
    await check("username", "Provide a valid username").not().isEmpty().isString().run(req);
    await check("password", "Provide a valid password").not().isEmpty().isString().run(req);
    
    const errors = myValidationResult(req);

    if (!errors.isEmpty()) {
        return ResMsg(res, 400, errors.array(), '');
    }
    
    return await login(res, req.body);
}