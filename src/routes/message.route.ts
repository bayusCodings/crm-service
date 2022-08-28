import express, { Router } from 'express';
import { MessageController } from '../controllers';
import { MessageValidation } from '../validations';
import { AsyncError } from '../errorhandlers';

const router: Router = express.Router();

router.route('/message').post(
  MessageValidation.validateMessageCreation,
  AsyncError(MessageController.createMessage)
);

router.route('/message/:id').put(
  MessageValidation.validateMessageReply,
  AsyncError(MessageController.replyMessage)
);

router.route('/message/agent/:agentId').get(
  MessageValidation.validateAgentMessageRetrieval,
  AsyncError(MessageController.fetchAgentMessages)
);

router.route('/message/search').get(AsyncError(MessageController.search));

export default router