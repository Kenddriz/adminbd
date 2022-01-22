import { CreateSyntheseInput } from './synthese.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSyntheseInput extends PartialType(CreateSyntheseInput) {
  @Field(() => Int)
  id: number;
}
