import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEmployeInput {

  @Field(() => Int)
  serviceId: number;

  @Field(() => String)
  nom: string;

  @Field(() => Int)
  salaire: number;
  
}
