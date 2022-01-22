import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuditService } from './audit.service';
import { Audit } from './audit.entity';

@Resolver(() => Audit)
export class AuditResolver {
  constructor(private readonly auditService: AuditService) {}

  @Query(() => [Audit], { name: 'audit' })
  findAll() {
    return this.auditService.findAll();
  }

  @Query(() => Audit, { name: 'audit' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.auditService.findOne(id);
  }

  @Mutation(() => Audit)
  removeAudit(@Args('id', { type: () => Int }) id: number) {
    return this.auditService.remove(id);
  }
}
