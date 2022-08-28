import { Question } from '../models';
import { IQuestion } from '../models/interfaces';
import MongoRepository from './mongo.repository';

class QuestionRepository extends MongoRepository<IQuestion> {
  constructor() {
    super(Question);
  }
}

export default new QuestionRepository();
