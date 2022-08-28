import express, { Router } from 'express';
import { AgentController } from '../controllers';
import { AgentValidation } from '../validations';

const router: Router = express.Router();

router.route('/agent').post(AgentValidation.validateAgentCreation, AgentController.createAgent);
router.route('/agents').get(AgentController.fetchAllAgents);

export default router