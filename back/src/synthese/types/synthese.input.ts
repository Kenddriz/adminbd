import { InputType, Int, Field } from '@nestjs/graphql';


@InputType()
export class CreateSyntheseInput {

  @Field(() => String)
  intitule: string;

  @Field(() => Int)
  effectif: number;

  @Field(() => Int)
  somSalaire: number;
  
  @Field(() => Int)
  nombreSalDef: number;

}

@InputType()
export class UpdateSyntheseInput extends CreateSyntheseInput {
  @Field(() => Int)
  id: number;
}
