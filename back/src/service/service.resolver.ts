import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { ServiceService } from './service.service';
import { Service } from './service.entity';
import { CreateServiceInput, UpdateServiceInput } from './types/input';
import { Employe } from '../employe/employe.entity';
import { EmployeService } from '../employe/employe.service';

@Resolver(() => Service)
export class ServiceResolver {
  constructor(
    private serviceService: ServiceService,
    private employeeService: EmployeService,
  ) {}

  @Mutation(() => Service)
  async createService(@Args('input') input: CreateServiceInput) {
    const service = new Service();
    Object.assign(service, input);
    return this.serviceService.save(service);
  }

  @Query(() => [Service])
  services() {
    return this.serviceService.findAll();
  }
  @Mutation(() => Service)
  async updateService(@Args('input') input: UpdateServiceInput) {
    const { id, ...res } = input;
    const service = await this.serviceService.findOne(id);
    Object.assign(service, res);
    return this.serviceService.save(service);
  }

  @Mutation(() => Boolean)
  async removeService(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.serviceService.remove(id);
  }

  @ResolveField(() => [Employe])
  employes(@Root() service: Service) {
    return this.employeeService.findEmployesByService(service.id);
  }
}
