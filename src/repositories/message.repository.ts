import { Types } from 'mongoose';
import { Message } from '../models';
import { IMessage } from '../models/interfaces';
import MongoRepository from './mongo.repository';
import logger from '../logger';

class MessageRepository extends MongoRepository<IMessage> {
  constructor() {
    super(Message);
  }

  fetchAgentMessagesByPriority(agentId: string) {
    logger.debug('MessageRepository.fetchAgentMessagesByPriority(%s)', agentId);
    return this.model.aggregate([
      { $match: { agent: new Types.ObjectId(agentId) } },
      {
        $lookup: {
          from: "categories", // collection to join
          localField: "category", // field from the input documents (message.category),
          foreignField: "name", // field from the documents of the "from" collection (category.name)
          as: "categoryList" // output array field
        }
      },
      { $unwind: "$categoryList" },
      { $sort: { "categoryList.priority": 1 } }, // sort messages by category priority
      {
        $project: {
          _id: 1,
          userId: 1,
          agent: 1,
          body: 1,
          date: 1,
          replied: 1,
          reply: 1,
          category: 1
        }
      }
    ])
  }
}

export default new MessageRepository();
