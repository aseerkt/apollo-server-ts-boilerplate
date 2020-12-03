import { validate } from 'class-validator';
import { User } from '../entity/User';
import { extractErrors } from '../utils/extractErrors';

export const registerUser = async (email: string, password: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return { errors: [{ path: 'email', message: 'Email is already taken' }] };
  }
  const user = User.create({ email, password });
  const errors = await validate(user);
  if (errors.length > 0) {
    return { errors: extractErrors(errors) };
  }
  // All good
  await user.save();
  return { user };
};
