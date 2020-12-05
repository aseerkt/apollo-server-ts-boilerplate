import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'argon2';
import { IsEmail, Length } from 'class-validator';
import { Field, ObjectType } from 'type-graphql';
import { invalidEmail, passwordNotLongEnough } from '../errorMessages';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: invalidEmail })
  email: string;

  @Column('text')
  @Length(6, undefined, {
    message: passwordNotLongEnough,
  })
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, { hashLength: 15 });
  }
}
