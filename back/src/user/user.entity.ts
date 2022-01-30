import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 80 })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 20, unique: true })
  username: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  password: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 21, default: '' })
  avatar: string;

  @Field(() => Int)
  @Column({ type: 'int', width: 1, default: 0 })
  role: number;

  @Field()
  @DeleteDateColumn({ type: 'datetime', name: 'created_at' })
  updatedAt: Date;
}
