import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn , CreateDateColumn,} from 'typeorm';

@ObjectType()
@Entity({ name: 'synthese' })
export class Synthese {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  // @Field()
  // @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  // createdAt: Date;

  @Field(() => String)
  @Column({ type: 'varchar' })
  intitule: string;

  @Field(() => Int)
  @Column({ type: 'int', name: 'effectif' })
  effectif: number;

  @Field(() => Int)
  @Column({ type: 'int', name: 'somSalaire' })
  somSalaire: number;

  @Field(() => Int)
  @Column({ type: 'int', name: 'nombreSalDef' })
  nombreSalDef: number;
}
