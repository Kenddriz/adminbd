import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String)
  async getAll() {
    return 'Hello world';
  }
}
