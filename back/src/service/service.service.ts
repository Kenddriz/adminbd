import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

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

  async remove(id: number): Promise<boolean> {
    const { affected } = await this.repository.softDelete(id);
    return affected > 0;
  }
}
