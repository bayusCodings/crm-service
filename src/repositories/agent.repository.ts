import { config } from '../config'
import { Agent } from '../models';
import { IAgent } from '../models/interfaces';
import MongoRepository from './mongo.repository';
import logger from '../logger';

class AgentRepository extends MongoRepository<IAgent> {
  constructor() {
    super(Agent);
  }

  /**
   * Fetch a random agent whose active assigned messages 
   * are less than the MAX_ALLOWED_MESSAGES.
   * @returns 
   */
  fetchAvailableAgent() {
    logger.debug('MessageRepository.fetchAvailableAgent()');
    return this.model.aggregate([
      { 
        $match: {
          activeMessageCount: { $lt: config.MAX_ALLOWED_MESSAGES },
        }
      },
      { $sample: { size: 1 }}
    ])
  }

  /**
   * Fetch any random agent.
   */
  fetchRandomAgent() {
    logger.debug('MessageRepository.fetchRandomAgent()');
    return this.model.aggregate([
      { $sample: { size: 1 }}
    ])
  }
}

export default new AgentRepository();
