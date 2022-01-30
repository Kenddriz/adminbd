import { Field, InputType } from '@nestjs/graphql';
import { Stream } from 'stream';

@InputType()
export class Upload {
  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;

  @Field(() => Stream)
  createReadStream: () => Stream;
}
