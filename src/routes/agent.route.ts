import express, { Router } from 'express';
import { AgentController } from '../controllers';
import { AgentValidation } from '../validations';
import { AsyncError } from '../errorhandlers';

const router: Router = express.Router();

router.route('/agent').post(AgentValidation.validateAgentCreation, AsyncError(AgentController.createAgent));
router.route('/agents').get(AsyncError(AgentController.fetchAllAgents));

export default router