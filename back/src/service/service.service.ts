import { Injectable } from '@nestjs/common';
import { UpdateServiceInput } from './types/update-service.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { ResolveField } from '@nestjs/graphql';
import { Employe } from '../employe/employe.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private repository: Repository<Service>,
  ) {}
  async save(service: Service) {
    return this.repository.save(service);
  }

  async findAll(): Promise<Service[]> {
    return this.repository.find({
      order: { intitule: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Service> {
    return this.repository.findOne(id);
  }

  update(id: number, updateServiceInput: UpdateServiceInput) {
    return `This action updates a #${id} service`;
  }

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.repository.softDelete(id);
    return affected > 0;
  }

 

}
