import { Injectable } from '@nestjs/common';
import { Synthese } from './synthese.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SyntheseService {
  constructor(
    @InjectRepository(Synthese)
    private repository: Repository<Synthese>,
  ) {}
  async findAll(): Promise<Synthese[]> {
    return this.repository.find({
      order: { intitule: 'ASC' },
    });
  }
}
