import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryInput } from './types/input';
import { UpdateCategoryInput } from './types/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryservice: CategoryService) {}

  @Mutation(() => Category)
  async createCategory(@Args('input') input: CreateCategoryInput) {
    const category = new Category();
    Object.assign(category, input);
    return this.categoryservice.save(category);
  }


  @Query(() => [Category])
  categories() {
    return this.categoryservice.findAll();
  }


  @Query(() => Category)
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryservice.findOne(id);
  }

  
  @Mutation(() => Category)
  async updateCategory(@Args('input') input: UpdateCategoryInput) {
    const { id, ...res } = input;
    const category = await this.categoryservice.findOne(id);
    Object.assign(category, res);
    return this.categoryservice.save(category);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryservice.remove(id);
  }
}
