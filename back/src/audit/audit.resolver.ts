import { Resolver, Query } from '@nestjs/graphql';
import { AuditService } from './audit.service';
import { Audit } from './audit.entity';

@Resolver(() => Audit)
export class AuditResolver {
  constructor(private auditService: AuditService) {}

  @Query(() => [Audit])
  audits() {
    return this.auditService.findAll();
  }
}
