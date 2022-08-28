import express, { Router } from 'express';
import AgentRoute from './agent.route';
import MessageRoute from './message.route';

const router: Router = express.Router();

router.use('/', AgentRoute);
router.use('/', MessageRoute);

export default router
