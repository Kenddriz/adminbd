import { Injectable } from '@nestjs/common';
import { CreateSyntheseInput } from './types/synthese.input';
import { UpdateSyntheseInput } from './types/update-synthese.input';
import { Synthese } from './synthese.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class SyntheseService {

  constructor(
    @InjectRepository(Synthese)
    private repository: Repository<Synthese>,
  ) { }
  
  async save(synthese: Synthese) {
    return this.repository.save(synthese);
  }

  async findAll(): Promise<Synthese[]> {
    return this.repository.find({
      order: { intitule: 'ASC',effectif:'ASC',somSalaire:'ASC',nombreSalDef:'ASC'},
    });
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
