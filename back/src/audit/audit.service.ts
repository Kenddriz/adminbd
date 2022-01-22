import { Injectable } from '@nestjs/common';
import { UpdateAuditInput } from './types/update-audit.input';
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

  findAll() {
    return `This action returns all audit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} audit`;
  }

  update(id: number, updateAuditInput: UpdateAuditInput) {
    return `This action updates a #${id} audit`;
  }

  remove(id: number) {
    return `This action removes a #${id} audit`;
  }
}
