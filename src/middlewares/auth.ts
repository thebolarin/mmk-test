import  PhoneNumber from '../database/models/phoneNumber';
import express, { Request, Response, NextFunction } from 'express';
import { ResMsg } from '../util';
import * as jwt from 'jsonwebtoken';
import Account from "../database/models/account";

type Indexed = {
  [key: string]: any;
};

export const checkAuth = async (req: Indexed, res: Response, next: NextFunction) => {

  const token: any = req.headers['Authorization'] || req.headers['authorization'];

  if(process.env.NODE_ENV === 'test'){
    req.decoded = {
      "id": 1,
      "auth_id": "20S0KPNOIM",
      "username": "azr1",
      "phone_number": [
          {
              "id": 1,
              "account_id": 1,
              "number": "4924195509198"
          },
          {
              "id": 2,
              "account_id": 1,
              "number": "4924195509196"
          },
          {
              "id": 3,
              "account_id": 1,
              "number": "4924195509197"
          },
          {
              "id": 4,
              "account_id": 1,
              "number": "4924195509195"
          },
          {
              "id": 5,
              "account_id": 1,
              "number": "4924195509049"
          },
          {
              "id": 6,
              "account_id": 1,
              "number": "4924195509012"
          },
          {
              "id": 7,
              "account_id": 1,
              "number": "4924195509193"
          },
          {
              "id": 8,
              "account_id": 1,
              "number": "4924195509029"
          },
          {
              "id": 9,
              "account_id": 1,
              "number": "4924195509192"
          },
          {
              "id": 10,
              "account_id": 1,
              "number": "4924195509194"
          },
          {
              "id": 11,
              "account_id": 1,
              "number": "31297728125"
          },
          {
              "id": 12,
              "account_id": 1,
              "number": "3253280312"
          },
          {
              "id": 13,
              "account_id": 1,
              "number": "3253280311"
          },
          {
              "id": 14,
              "account_id": 1,
              "number": "3253280315"
          },
          {
              "id": 15,
              "account_id": 1,
              "number": "3253280313"
          },
          {
              "id": 16,
              "account_id": 1,
              "number": "3253280329"
          },
          {
              "id": 17,
              "account_id": 1,
              "number": "441224459508"
          },
          {
              "id": 18,
              "account_id": 1,
              "number": "441224980086"
          },
          {
              "id": 19,
              "account_id": 1,
              "number": "441224980087"
          },
          {
              "id": 20,
              "account_id": 1,
              "number": "441224980096"
          },
          {
              "id": 21,
              "account_id": 1,
              "number": "441224980098"
          },
          {
              "id": 22,
              "account_id": 1,
              "number": "441224980099"
          },
          {
              "id": 23,
              "account_id": 1,
              "number": "441224980100"
          }
      ]
  }
    return next();
  }

  if (token) {
    let decodedToken:any;

    try {
      decodedToken = await jwt.verify(token, process.env.APPLICATION_KEY);
    }catch (err) {
      decodedToken = null;
    }

    if(decodedToken != null) {
        const account = await Account.findOne({
            where: { id: decodedToken.id },
            include: [{
                model: PhoneNumber,
                as: 'phone_number',
            }]
        });

      if(account){
        req.decoded = account;
        return next();
      }else {
        return ResMsg(res, 403, 'Invalid account - Access Restricted!');
      }
    }else {
      return ResMsg(res, 403, 'Invalid account - Access Restricted!');
    }
    
  } else {
    return ResMsg(res, 403, 'Access Restricted');
  }
};