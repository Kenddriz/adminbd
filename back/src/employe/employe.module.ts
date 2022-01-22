import { Global, Module } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { EmployeResolver } from './employe.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employe } from './employe.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Employe])],
  providers: [EmployeResolver, EmployeService],
  exports: [EmployeService],
})
export class EmployeModule {}
