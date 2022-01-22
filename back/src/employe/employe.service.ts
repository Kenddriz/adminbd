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

  findAll() {
    return `This action returns all employe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employe`;
  }

  update(id: number, updateEmployeInput: UpdateEmployeInput) {
    return `This action updates a #${id} employe`;
  }

  remove(id: number) {
    return `This action removes a #${id} employe`;
  }
}
