import { Injectable } from '@nestjs/common';
import { UpdateCategoryInput } from './types/update-category.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}
  async save(category: Category) {
    return this.repository.save(category);
  }

  async findAll(): Promise<Category[]> {

    return this.repository.find({
      order: { name: 'ASC'},
    });
  }

  async findOne(id: number): Promise<Category> {
    return this.repository.findOne(id);
  }

  update(id: number, UpdateCategoryInput: UpdateCategoryInput) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
