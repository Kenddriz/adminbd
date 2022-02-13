import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SyntheseService } from './synthese.service';
import { Synthese } from './synthese.entity';
import { CreateSyntheseInput } from './types/synthese.input';
import { UpdateSyntheseInput } from './types/update-synthese.input';

@Resolver(() => Synthese)
export class SyntheseResolver {
  constructor(private  syntheseService: SyntheseService) {}

  @Mutation(() => Synthese)
  async createSynthese(@Args('input') input: CreateSyntheseInput) {
    const synthese = new Synthese();
    Object.assign(synthese, input);
    return this.syntheseService.save(synthese);
  }

  @Query(() => [Synthese])
  syntheses() {
    return this.syntheseService.findAll();
  }

  @Mutation(() => Synthese)
  updateSynthese(@Args('updateSyntheseInput') updateSyntheseInput: UpdateSyntheseInput) {
    return this.syntheseService.update(updateSyntheseInput.id, updateSyntheseInput);
  }

  @Mutation(() => Synthese)
  removeSynthese(@Args('id', { type: () => Int }) id: number) {
    return this.syntheseService.remove(id);
  }
}
