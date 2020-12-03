import { User } from '../entity/User';
import { FieldError } from '../types';
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { registerUser } from 'src/services/UserServicers';

@ObjectType()
class RegisterResponse {
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
    @Arg('password') password: string
  ) {
    return registerUser(email, password);
  }
}
