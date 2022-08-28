import express, { Router } from 'express';
import AgentRoute from './agent.route';

const router: Router = express.Router();

router.use('/', AgentRoute);

export default router