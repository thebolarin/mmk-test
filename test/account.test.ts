import { inBoundSMS, outBoundSMS } from './../src/services/index';
import request from "supertest";
import { app } from "../src/app";
import faker from "faker";
import redis from '../src/config/redis-client';
import redisKeys from '../src/config/redis-key-gen';
const client = redis.getClient();

//@ts-ignore
let commonHeaders: any = { Authorization: "xxx" };

it('should return 405 error if route or method is not supported', async() => {
  await request(app)
  .get('/api/user')
  .set(commonHeaders)
  .send()
  .expect(405);
});

describe('test inbound API', () => {

  it('should be defined', () => {
    expect(inBoundSMS).toBeDefined();
  });

  it('should return error if the to parameter is not found in the associated phone_number data', async () => {
    const from = '441224980100';
    const to = '441224459548';

    let result = await request(app)
      .post('/api/account/inbound/sms')
      .set(commonHeaders)
      .send({
        from: from,
        to: to,
        text: faker.helpers.randomize(),
      })
      .expect(400);

    expect(JSON.parse(result.text).error).toEqual('to parameter not found');

    const keyId = redisKeys.getKey(`STOP_${from}_${to}`);
    const value = await client.get(keyId);

    expect(value).toBeNull();
  });

  it('should return a message and also exist in cache', async () => {
   const from =  '31297728125';
    const to = '441224980096';

    let result = await request(app)
      .post('/api/account/inbound/sms')
      .set(commonHeaders)
      .send({
        from: from,
        to: to,
        text: `STOP ${faker.helpers.randomize()}`,
      })
      .expect(200);

    expect(JSON.parse(result.text).message).toEqual('inbound sms ok');

    const keyId = redisKeys.getKey(`STOP_${from}_${to}`);
    const value = await client.get(keyId);

    expect(value).toBeTruthy();


  });

});

describe('test outbound API', () => {

  it('should be defined', () => {
    expect(outBoundSMS).toBeDefined();
  });

  it('should return error if the from parameter is not found in the associated phone_number data', async () => {
    
    let result = await request(app)
      .post('/api/account/outbound/sms')
      .set(commonHeaders)
      .send({
        from: "441224459660",
        to: "441224980100",
        text: faker.helpers.randomize(),
      })
      .expect(400);

    expect(JSON.parse(result.text).error).toEqual('from parameter not found');
  });

  it('should return error if the from to pair already exists in the cache', async () => {
    const from =  '31297728125';
    const to = '441224980096';

    let result = await request(app)
      .post('/api/account/outbound/sms')
      .set(commonHeaders)
      .send({
        from: from,
        to: to,
        text: faker.helpers.randomize(),
      })
      .expect(400);

      expect(JSON.parse(result.text).error).toEqual(`sms from ${from} to ${to} blocked by STOP request`);

      const keyId = redisKeys.getKey(`STOP_${from}_${to}`);
      const value = await client.get(keyId);

      expect(value).toBeTruthy();
  });

  it('should return error if more than 50 requests is sent with the same from parameter in the last 24 hours', async () => {
    const from =  '44122498';
    const to = '441224980096';
    
    await test(from,to);

    let result = await request(app)
      .post('/api/account/outbound/sms')
      .set(commonHeaders)
      .send({
        from: from,
        to: to,
        text: faker.helpers.randomize(),
      })
      .expect(400);

      expect(JSON.parse(result.text).error).toEqual(`limit reached for from ${from}`);
  });

});

const test: any = async (from: string, to: string) => {
  for (let i = 0; i < 50; i++) {
    await request(app).post('/api/account/outbound/sms').send({
      from: from,
      to: to,
    })
  }
}
