import { Delete } from '@nestjs/common';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employe } from '../employe/employe.entity';

@ObjectType()
@Entity({ name: 'service' })
export class Service {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  intitule: string;

  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: Date;

  @Field(() => [Employe])
  @OneToMany(() => Employe, (employe) => employe.service)
  employes: Employe[];
  
}
