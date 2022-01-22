import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
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

  @Field(() => [Employe])
  @OneToMany(() => Employe, (employe) => employe.service)
  employes: Employe[];

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @Field()
  @CreateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;
}
