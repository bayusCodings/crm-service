import { ICategory } from '../models/interfaces';
import { CategoryRepository } from '../repositories';
import logger from '../logger';

const categories: ICategory[] = [
  {
    name: 'loan',
    priority: 1
  },
  {
    name: 'approval',
    priority: 2
  },
  {
    name: 'disbursement',
    priority: 3
  },
  {
    name: 'repayment',
    priority: 4
  },
  {
    name: 'enquires',
    priority: 5
  },
  {
    name: 'uncategorized',
    priority: 6
  }
]

const seedDB = async () => {
  await CategoryRepository.deleteMany();
  await CategoryRepository.insertMany(categories)
}

seedDB()
  .then(() => logger.info('categories successfully seeded'))
  .catch(error => logger.error('Failed to seed categories: %o', error))
  .finally(() => process.exit());