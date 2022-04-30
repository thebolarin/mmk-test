import PhoneNumber from '../database/models/phoneNumber';
import express, { Request, Response, NextFunction } from 'express';
import { ResMsg } from '../util';
import Account from "../database/models/account";
import redis from '../config/redis-client';
import redisKeys from '../config/redis-key-gen';
const client = redis.getClient();

type Indexed = {
  [key: string]: any;
};

export const checkLimit = async (req: Indexed, res: Response, next: NextFunction) => {
  try {
    const { from } = req.body;
    const keyId = redisKeys.getKey(`LIMIT_${from}`);
    const value = await client.get(keyId);

    if (!value) {
      await client.set(keyId, JSON.stringify({ count: 1, createdAt: Date.now() }));
      return next();
    }
    let result = JSON.parse(value);

    const timeDiff = Math.round((Date.now() - result.createdAt) / 1000);

    if (timeDiff <= 86400 && result.count === 50) {
      return ResMsg(res, 400, `limit reached for from ${from}`);
    }

    if (timeDiff > 86400) {
      await client.set(keyId, JSON.stringify({ count: 1, createdAt: Date.now() }));
      return next();
    }

    const updateCount = result.count + 1;
    await client.set(keyId, JSON.stringify({ count: updateCount, createdAt: result.createdAt }));
    return next();
  } catch (err) {
    return ResMsg(res, 400, `unknown failure`);
  }
};