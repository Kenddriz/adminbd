import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SyntheseService } from './synthese.service';
import { Synthese } from './synthese.entity';
import { CreateSyntheseInput } from './types/synthese.input';
import { UpdateSyntheseInput } from './types/update-synthese.input';

@Resolver(() => Synthese)
export class SyntheseResolver {
  constructor(private readonly syntheseService: SyntheseService) {}

  @Mutation(() => Synthese)
  createSynthese(@Args('createSyntheseInput') createSyntheseInput: CreateSyntheseInput) {
    return this.syntheseService.create(createSyntheseInput);
  }

  @Query(() => [Synthese], { name: 'synthese' })
  findAll() {
    return this.syntheseService.findAll();
  }

  @Query(() => Synthese, { name: 'synthese' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.syntheseService.findOne(id);
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
