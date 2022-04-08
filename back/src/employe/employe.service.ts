import { Injectable } from '@nestjs/common';
import { CreateEmployeInput } from './types/input';
import { UpdateEmployeInput } from './types/output';
import { InjectRepository } from '@nestjs/typeorm';
import { Employe } from './employe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeService {
  constructor(
    @InjectRepository(Employe)
    private repository: Repository<Employe>,
  ) {}

  async save(employe: Employe) {
    return this.repository.save(employe);
  }

  async findAll(): Promise<Employe[]> {
    return this.repository.find({
      order: { nom: 'ASC', role: 'ASC', salaire: 'ASC' },
    });
  }

  async findOne(id: number) {
    return this.repository.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.repository.delete(id);
    return affected > 0;
  }
}
