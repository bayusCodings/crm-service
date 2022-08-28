import { Agent } from '../models';
import { IAgent } from '../models/interfaces';
import MongoRepository from './mongo.repository';

class AgentRepository extends MongoRepository<IAgent> {
  constructor() {
    super(Agent);
  }
}

export default new AgentRepository();
