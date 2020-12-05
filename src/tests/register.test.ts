import { gql, request } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../constants';
import { User } from '../entity/User';
import {
  duplicateEmail,
  invalidEmail,
  passwordNotLongEnough,
} from '../errorMessages';
import { createTypeOrmConnection } from '../utils/createTypeOrmConn';

beforeAll(async () => {
  await createTypeOrmConnection();
});

const email = 'test@jest.com';
const password = 'jest_pwd';

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`;

describe('Register User', () => {
  test('check if register mutation works', async () => {
    const res = await request(GRAPHQL_ENDPOINT, REGISTER_MUTATION, {
      email: email,
      password: password,
    });
    expect(res).toMatchObject({
      register: { user: { email: email }, errors: null },
    });
    const user = await User.findOne({ where: { email } });
    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
    expect(user?.password).not.toEqual(password);
    expect(res).toMatchObject({
      register: { user: { email: email }, errors: null },
    });
  });

  test('check for duplicate email', async () => {
    const res2 = await request(GRAPHQL_ENDPOINT, REGISTER_MUTATION, {
      email: email,
      password: password,
    });
    expect(res2).toMatchObject({
      register: {
        user: null,
        errors: [{ path: 'email', message: duplicateEmail }],
      },
    });
  });

  test('check for bad email input', async () => {
    const res3 = await request(GRAPHQL_ENDPOINT, REGISTER_MUTATION, {
      email: 'bad email',
      password: password,
    });
    expect(res3).toMatchObject({
      register: {
        user: null,
        errors: [{ path: 'email', message: invalidEmail }],
      },
    });
  });

  test('Check for bad password input', async () => {
    const res4 = await request(GRAPHQL_ENDPOINT, REGISTER_MUTATION, {
      email: 'testingpass@jest.com',
      password: 'afs',
    });
    expect(res4).toMatchObject({
      register: {
        user: null,
        errors: [
          {
            path: 'password',
            message: passwordNotLongEnough,
          },
        ],
      },
    });
  });
});
