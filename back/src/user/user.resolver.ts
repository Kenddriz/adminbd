import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput, UpdateUserInput } from './types/user.input';
import { GraphQLUpload } from 'graphql-upload';
import { removeFile, upload } from '../utils';
import { Upload } from 'src/shared/shared.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => User)
  async createUser(
    @Args('input') input: CreateUserInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image: Upload,
  ): Promise<User> {
    let user = new User();
    Object.assign(user, input);
    user.password = input.username;
    if (image) {
      const { filename } = await upload(image, '/avatars');
      user.avatar = filename;
    }
    user = await this.userService.save(user);
    return user;
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image: Upload,
  ): Promise<User> {
    const user = await this.userService.findOneById(input.id);
    Object.assign<User, UpdateUserInput>(user, input);
    if (image) {
      const folder = '/avatars/' + user.id + '/';
      if (user.avatar) removeFile(folder + user.avatar);
      const { filename } = await upload(image, folder);
      user.avatar = filename;
    }
    return this.userService.save(user);
  }
  
  @Mutation(() => Boolean)
  async softRemoveUser(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.userService.softDelete(id);
  }
}
