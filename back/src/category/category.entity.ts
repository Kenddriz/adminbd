import { ObjectType, Field, Int } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'category' })
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  slug: string;
}
