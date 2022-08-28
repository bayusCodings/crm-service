import { Category } from '../models';
import { ICategory } from '../models/interfaces';
import MongoRepository from './mongo.repository';
import logger from '../logger';

class CategoryRepository extends MongoRepository<ICategory> {
  constructor() {
    super(Category);
  }

  findByCategoryName(name?: string) {
    logger.debug('CategoryRepository.findByCategoryName(%s)', name);
    return this.findOne({ name });
  }
}

export default new CategoryRepository();
