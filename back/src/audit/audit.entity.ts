import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'audit_employe' })
export class Audit {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  qui: string;

  @Field(() => String)
  @Column({ type: 'varchar', name: 'quoi' })
  quoi: string;

  @Field()
  @Column({ type: 'timestamp' })
  quand: Date;

  @Field(() => Float)
  @Column({ type: 'float', name: 'nouveau_salaire' })
  nouveauSalaire: number;

  @Field(() => Float)
  @Column({ type: 'float', name: 'ancien_salaire' })
  ancienSalaire: number;
}
