import { Request, Response, NextFunction } from 'express';
import { handleValidationError } from './validation.error';
import Joi from 'joi';

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
    const schema = Joi.object({
      reply: Joi.string().required()
    });
    
    const validationResult = schema.validate(req.body, {allowUnknown: false});
    return handleValidationError(validationResult, next)
  };
}

export default new MessageValidation();
