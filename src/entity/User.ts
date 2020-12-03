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

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid Email Address' })
  email: string;

  @Column('text')
  @Length(6, undefined, {
    message: 'Password must be atleast 6 characters long',
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, { hashLength: 15 });
  }
}
