import { Request } from 'express';
import { RedisClient } from 'redis';

export interface MyContext {
  req: Request;
  res: Response;
  redis: RedisClient;
}
