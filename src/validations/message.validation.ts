import { Request, Response, NextFunction } from 'express';
import { handleValidationError } from './validation.error';
import { isValidObjectId } from 'mongoose';
import Joi from 'joi';
import UnprocessableEntityException from '../exceptions/unprocessable-entity.exception';

class MessageValidation {
  validateMessageCreation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      userId: Joi.string().required(),
      body: Joi.string().required(),
      category: Joi.string().allow('').optional()
    });
    
    const validationResult = schema.validate(req.body, {allowUnknown: false});
    return handleValidationError(validationResult, next)
  };

  validateMessageReply(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
      if (!isValidObjectId(id)) {
      throw new UnprocessableEntityException(`Invalid ObjectId: ${id}`);
    }

    const schema = Joi.object({
      reply: Joi.string().required()
    });
    
    const validationResult = schema.validate(req.body, {allowUnknown: false});
    return handleValidationError(validationResult, next)
  };
  
  validateAgentMessageRetrieval(req: Request, res: Response, next: NextFunction) {
    const id = req.params.agentId
      if (!isValidObjectId(id)) {
      throw new UnprocessableEntityException(`Invalid ObjectId: ${id}`);
    }
    next();
  }
}

export default new MessageValidation();
