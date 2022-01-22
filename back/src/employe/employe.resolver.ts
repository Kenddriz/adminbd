import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeService } from './employe.service';
import { Employe } from './employe.entity';
import { CreateEmployeInput } from './types/input';
import { UpdateEmployeInput } from './types/output';
import { ServiceService } from '../service/service.service';
import { Service } from '../service/service.entity';

@Resolver(() => Employe)
export class EmployeResolver {
  constructor(
    private employeService: EmployeService,
    private serviceService: ServiceService,
  ) {}

  @Mutation(() => Employe)
  async createEmploye(@Args('input') input: CreateEmployeInput) {
    const { serviceId, ...res } = input;
    const employe = new Employe();
    employe.service = new Service();
    employe.service.id = serviceId;
    Object.assign(employe, res);
    return this.employeService.save(employe);
  }

  @Query(() => [Employe], { name: 'employe' })
  findAll() {
    return this.employeService.findAll();
  }

  @Query(() => Employe, { name: 'employe' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeService.findOne(id);
  }

  @Mutation(() => Employe)
  updateEmploye(
    @Args('updateEmployeInput') updateEmployeInput: UpdateEmployeInput,
  ) {
    return this.employeService.update(
      updateEmployeInput.id,
      updateEmployeInput,
    );
  }

  @Mutation(() => Employe)
  removeEmploye(@Args('id', { type: () => Int }) id: number) {
    return this.employeService.remove(id);
  }
}
