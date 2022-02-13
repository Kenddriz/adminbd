import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  slug: string;
}

@InputType()
export class UpdateCategoryInput extends CreateCategoryInput {
  @Field(() => Int)
  id: number;
}
