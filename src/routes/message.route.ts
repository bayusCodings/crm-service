import express, { Router } from 'express';
import { MessageController } from '../controllers';
import { MessageValidation } from '../validations';
import { AsyncError } from '../errorhandlers';
import { validateObjectID } from '../middleware';

const router: Router = express.Router();

router.route('/message').post(MessageValidation.validateMessageCreation, AsyncError(MessageController.createMessage));
router.route('/message/:id').put([validateObjectID, MessageValidation.validateMessageReply], AsyncError(MessageController.replyMessage));

export default router