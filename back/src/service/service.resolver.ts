import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './service.entity';
import { CreateServiceInput } from './types/input';
import { UpdateServiceInput } from './types/update-service.input';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(private serviceService: ServiceService) {}

  @Mutation(() => Service)
  async createService(@Args('input') input: CreateServiceInput) {
    const service = new Service();
    Object.assign(service, input);
    return this.serviceService.save(service);
  }

  @Query(() => [Service], { name: 'service' })
  findAll() {
    return this.serviceService.findAll();
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.serviceService.findOne(id);
  }

  @Mutation(() => Service)
  async updateService(@Args('input') input: UpdateServiceInput) {
    const { id, ...res } = input;
    const service = await this.serviceService.findOne(id);
    Object.assign(service, res);
    return this.serviceService.save(service);
  }

  @Mutation(() => Service)
  removeService(@Args('id', { type: () => Int }) id: number) {
    return this.serviceService.remove(id);
  }
}
