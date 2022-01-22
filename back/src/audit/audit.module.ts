import { Global, Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditResolver } from './audit.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Audit } from './audit.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  providers: [AuditResolver, AuditService],
  exports: [AuditService],
})
export class AuditModule {}
