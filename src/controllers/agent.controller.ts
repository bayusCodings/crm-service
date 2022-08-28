import { Request, Response } from 'express';
import { AgentService } from '../services';

class AgentController {
  async createAgent(req: Request, res: Response) {
    const response = await AgentService.create(req.body);
    res.status(201).json(response);
  }

  async fetchAllAgents(req: Request, res: Response) {
    const response = await AgentService.fetchAllAgents();
    res.status(200).json(response);
  }
}

export default new AgentController();