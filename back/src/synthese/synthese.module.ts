import { Module } from '@nestjs/common';
import { SyntheseService } from './synthese.service';
import { SyntheseResolver } from './synthese.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Synthese } from './synthese.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Synthese])],
  providers: [SyntheseResolver, SyntheseService],
})
  
export class SyntheseModule {}
