import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
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
  async createEmployee(@Args('input') input: CreateEmployeInput) {
    const { serviceId, ...res } = input;
    const employee = new Employe();
    employee.service = new Service();
    employee.service.id = serviceId;
    Object.assign(employee, res);
    return this.employeService.save(employee);
  }

  @Mutation(() => Employe)
  async updateEmployee(@Args('input') input: UpdateEmployeInput) {
    const { id, ...res } = input;
    const employee = await this.employeService.findOne(id);
    Object.assign(employee, res);
    return this.employeService.save(employee);
  }

  @Mutation(() => Boolean)
  removeEmploye(@Args('id', { type: () => Int }) id: number) {
    return this.employeService.remove(id);
  }

  @Query(() => [Employe])
  employees() {
    return this.employeService.findAll();
  }
  @ResolveField(() => Service)
  service(@Root() employee: Employe) {
    return this.serviceService.findOne(employee.serviceId);
  }
}
