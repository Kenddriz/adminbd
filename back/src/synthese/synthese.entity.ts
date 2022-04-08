import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'synthese' })
export class Synthese {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  intitule: string;

  @Field(() => Int)
  @Column({ type: 'int', name: 'effectif' })
  effectif: number;

  @Field(() => Int)
  @Column({ type: 'int', name: 'som_salaire' })
  somSalaire: number;

  @Field(() => Int)
  @Column({ type: 'int', name: 'nombre_sal_def' })
  nombreSalDef: number;
}
