import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;
  @Field(() => String, { nullable: true })
  username?: string;
}

@InputType()
export class UpdateUserInput extends CreateUserInput {
  @Field(() => Int)
  id: number;
}
