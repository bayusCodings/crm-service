import { Request, Response } from 'express';
import { MessageService } from '../services';

class MessageController {
  async createMessage(req: Request, res: Response) {
    const response = await MessageService.create(req.body);
    res.status(201).json(response);
  }

  async replyMessage(req: Request, res: Response) {
    const { reply } = req.body;
    const { id } = req.params;

    const response = await MessageService.reply(id, reply);
    res.status(200).json(response);
  }

  async fetchAgentMessages(req: Request, res: Response) {
    const { agentId } = req.params;

    const response = await MessageService.fetchAgentMessages(agentId);
    res.status(200).json(response);
  }

  async search(req: Request, res: Response) {
    const { keyword } = req.query;

    const response = await MessageService.search(<string> keyword);
    res.status(200).json(response);
  }
}

export default new MessageController();
