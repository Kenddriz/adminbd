import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Employe } from '../employe/employe.entity';

@ObjectType()
@Entity({ name: 'audits' })
export class Audit {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  quoi: string;

  @Field(() => Employe)
  @ManyToOne(() => Employe)
  @JoinColumn({ name: 'employe_id' })
  employe: Employe;
  @RelationId((audit: Audit) => audit.employe)
  employeId: number;

  @Field(() => Float)
  @Column({ type: 'float', name: 'nouveau_salaire' })
  nouveauSalaire: number;

  @Field(() => Float)
  @Column({ type: 'float', name: 'ancien_salaire' })
  ancienSalaire: number;
}
