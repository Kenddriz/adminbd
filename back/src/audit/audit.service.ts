import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Audit } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(Audit)
    private repository: Repository<Audit>,
  ) {}
  async save(audit: Audit) {
    return this.repository.save(audit);
  }
  async findAll() {
    return this.repository.find({
      order: {
        quoi: 'ASC',
      },
    });
  }
}
