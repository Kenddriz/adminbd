import { Injectable } from '@nestjs/common';
import { CreateSyntheseInput } from './types/synthese.input';
import { UpdateSyntheseInput } from './types/update-synthese.input';

@Injectable()
export class SyntheseService {
  create(createSyntheseInput: CreateSyntheseInput) {
    return 'This action adds a new synthese';
  }

  findAll() {
    return `This action returns all synthese`;
  }

  findOne(id: number) {
    return `This action returns a #${id} synthese`;
  }

  update(id: number, updateSyntheseInput: UpdateSyntheseInput) {
    return `This action updates a #${id} synthese`;
  }

  remove(id: number) {
    return `This action removes a #${id} synthese`;
  }
}
