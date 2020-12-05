import { User } from '../entity/User';
import { FieldError } from '../types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { MyContext } from '../MyContext';
import { duplicateEmail } from '../errorMessages';
import { validate } from 'class-validator';
import { extractErrors } from '../utils/extractErrors';
import { createConfirmEmailLink } from '../utils/createConfirmEmailLink';

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'Hello There';
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req, redis }: MyContext
  ) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { errors: [{ path: 'email', message: duplicateEmail }] };
    }
    const user = User.create({ email, password });
    const errors = await validate(user);
    if (errors.length > 0) {
      return { errors: extractErrors(errors) };
    }
    // All good
    await user.save();
    const url = req.headers.host!;
    createConfirmEmailLink(url, user.id, redis);
    return { user };
  }
}
