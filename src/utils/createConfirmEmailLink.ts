import { RedisClient } from 'redis';
import { v4 as uuidv4 } from 'uuid';

export const createConfirmEmailLink = (
  url: string,
  userId: string,
  redis: RedisClient
) => {
  const id = uuidv4();
  redis.set(id, userId);
  // expire after 3 hour
  redis.expireat(id, Number(+new Date()) + 3 * 60 * 60);
  return `${url}/confirm/${id}`;
};
