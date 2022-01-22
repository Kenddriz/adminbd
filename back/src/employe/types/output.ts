import { CreateEmployeInput } from './input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeInput extends PartialType(CreateEmployeInput) {
  @Field(() => Int)
  id: number;
}
