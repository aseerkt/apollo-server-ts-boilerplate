import { gql, request } from 'graphql-request';
import { startServer } from '../startServer';
import { GRAPHQL_ENDPOINT } from '../constants';
import { User } from '../entity/User';

beforeAll(async () => {
  // Connect to GraphQL Server
  await startServer();
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

test('Register User', async () => {
  // Make register mutation
  try {
    console.log(GRAPHQL_ENDPOINT);
    const res = await request(GRAPHQL_ENDPOINT, REGISTER_MUTATION, {
      email: email,
      password: password,
    });
    console.log('GraphQL Res', res);
    // Check the response type
    expect(res).toMatchObject({
      register: { user: { email: email }, errors: null },
    });
    // Check if added user is there in DB
    const user = await User.findOne({ where: { email } });
    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
    expect(user?.password).not.toEqual(password);
  } catch (err) {
    return console.error(err);
  }
});
