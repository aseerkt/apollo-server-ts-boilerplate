import { EXPRESS_ENDPOINT } from '../constants';
import { createConfirmEmailLink } from '../utils/createConfirmEmailLink';
import { User } from '../entity/User';
import axios from 'axios';
import { redisClient } from '../redisClient';
import { createTypeOrmConnection } from '../utils/createTypeOrmConn';

let userId: any;

beforeAll(async () => {
  await createTypeOrmConnection();
  const user = await User.create({
    email: 'jest@test.com',
    password: 'testpass',
  }).save();
  userId = user.id;
});

afterAll(() => {
  redisClient.quit();
});

describe('confirmEmailLink Test', () => {
  test('Check if user confirmed for valid url', async () => {
    const confirmURL = createConfirmEmailLink(
      EXPRESS_ENDPOINT,
      userId,
      redisClient
    );
    const text = await axios.get(confirmURL).then((res) => res.data);
    expect(text).toEqual('ok');
    // Check if user is confirmed in DB.
    const user = await User.findOne({ where: { id: userId } });
    expect(user?.confirmed).toBeTruthy();
    // Check if url is invalidated after confirmation
    const urlSplits = confirmURL.split('/');
    const confirmId = urlSplits[urlSplits.length - 1];
    redisClient.get(confirmId, (err, resKey) => {
      expect(err).toBeNull();
      expect(resKey).toBeNull();
    });
  });
});
