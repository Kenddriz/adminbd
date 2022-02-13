import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, RelationId,
} from 'typeorm';
import { Service } from '../service/service.entity';

@ObjectType()
@Entity({ name: 'employe' })
export class Employe {
  @Field(() => Int)
  @PrimaryGeneratedColumn('increment', { unsigned: true, type: 'int' })
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', length: 80 })
  nom: string;

  @Field(() => Int)
  @Column({ type: 'tinyint', width: 1 })
  role: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  salaire: number;

  @Field(() => Service)
  @ManyToOne(() => Service, (service) => service.employes)
  @JoinColumn({ name: 'service_id' })
  service: Service;
  @RelationId((employe: Employe) => employe.service)
  serviceId: number;

}
