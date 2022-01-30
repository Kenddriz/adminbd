import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.repository.findOne({ username });
  }

  async findOneById(id: number): Promise<User> {
    return this.repository.findOne({ id });
  }
  async findAll(): Promise<User[]> {
    return this.repository.find({ order: { name: 'ASC' } });
  }
  async softDelete(id: number): Promise<boolean> {
    const { affected } = await this.repository.softDelete(id);
    return affected > 0;
  }
}
