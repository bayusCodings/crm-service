import { Message } from '../models';
import { IMessage } from '../models/interfaces';
import MongoRepository from './mongo.repository';

class MessageRepository extends MongoRepository<IMessage> {
  constructor() {
    super(Message);
  }
}

export default new MessageRepository();
