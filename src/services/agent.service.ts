import { AgentRepository } from '../repositories';
import { IAgent } from '../models/interfaces';
import { asApiResponse } from '../types/response.dto';
import { InternalServerException, UnprocessanleEntityException } from '../exceptions';
import logger from '../logger';

class AgentService {
  /**
   * Creates a new agent
   */
  async create(data: IAgent) {
    logger.debug('AgentService.create(%o)', data);
    try {
      data.email = data.email.toLowerCase();

      const agent = await AgentRepository.insert(data);
      return asApiResponse(agent, 'Successfully created new agent')
    } catch(error: any) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        // Duplicate email
        logger.error('Failed to create new agent, duplicate email: %s', data.email);
        throw new UnprocessanleEntityException('Failed to create new agent, duplicate email');
      }

      logger.error('Failed to create new agent. %o', error);
      throw new InternalServerException('An error occured while creating new agent');
    }
  }

  async fetchAllAgents() {
    logger.debug('AgentService.fetchAllAgents()');
    try {
      const agents = await AgentRepository.findAll();
      return asApiResponse(agents, 'Agents successfully retrieved');
    } catch(error) {
      logger.error('Failed to fetch agents. %o', error);
      throw new InternalServerException('An error occured while fetching agents');
    }
  }
}

export default new AgentService();