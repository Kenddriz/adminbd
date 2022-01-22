import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSyntheseInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
