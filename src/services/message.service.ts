import { AgentRepository, MessageRepository } from '../repositories';
import { IMessage } from '../models/interfaces';
import { asApiResponse } from '../types/response.dto';
import { InternalServerException, NotFoundException } from '../exceptions';
import logger from '../logger';

class MessageService {
  private async getAvailableAgent() {
    let agents;

    agents = await AgentRepository.fetchAvailableAgent()
    if (!agents.length) {
        agents = await AgentRepository.fetchRandomAgent()
    }
    return agents[0];
  }

  async create(data: IMessage) {
    logger.debug('MessageService.create(%o)', data);
    try {
      const agent = await this.getAvailableAgent()
      data.agentId = agent._id;
      data.date = new Date();

      const message = await MessageRepository.insert(data);
      
      // Update agent active message
      await AgentRepository.save(agent._id, { $inc: { activeMessageCount: 1 } })

      return asApiResponse(message, 'Successfully created new message')
    } catch(error: any) {
      logger.error('Failed to create new message. %o', error);
      throw new InternalServerException('An error occured while creating new message');
    }
  }

  async reply(messageId: string, reply: string) {
    logger.debug('MessageService.reply(%s)', messageId);
    try {
      const message = await MessageRepository.findById(messageId);
      if (!message) {
        logger.debug('message not found with id: %s', messageId);
        throw new NotFoundException(`message not found with id: ${messageId}`)
      }
      
      const updatedMessage = await MessageRepository.save(
        message._id, {
          reply,
          replied: true 
        }
      );
      // Update agent active message
      await AgentRepository.save(message.agentId, { $inc: { activeMessageCount: -1 } })

      return asApiResponse(updatedMessage, 'Successfully replied to message')
    } catch(error: any) {
      if (error.name === 'NotFoundException') {
        throw new NotFoundException(error.message);
      }

      logger.error('Failed to reply to message. %o', error);
      throw new InternalServerException('An error occured while replying to message');
    }
  }
}

export default new MessageService();
