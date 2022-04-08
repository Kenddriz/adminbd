import { Resolver, Query } from '@nestjs/graphql';
import { SyntheseService } from './synthese.service';
import { Synthese } from './synthese.entity';

@Resolver(() => Synthese)
export class SyntheseResolver {
  constructor(private syntheseService: SyntheseService) {}

  @Query(() => [Synthese])
  syntheses() {
    return this.syntheseService.findAll();
  }
}
