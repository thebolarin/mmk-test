import request from 'supertest';
import { app } from '../src/app';
import sequelize from "../src/database/models/sequelize";

beforeEach(async () => {
  //jest.clearAllMocks();
  process.env.NODE_ENV === "test"
});