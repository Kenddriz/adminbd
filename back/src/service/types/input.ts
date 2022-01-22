import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateServiceInput {
  @Field(() => String)
  intitule: string;
}

@InputType()
export class UpdateServiceInput extends CreateServiceInput {
  @Field(() => Int)
  id: number;
}
