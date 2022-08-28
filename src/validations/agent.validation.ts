import { Request, Response, NextFunction } from 'express';
import { handleValidationError } from './validation.error';
import Joi from 'joi';

class AgentValidation {
  validateAgentCreation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
    });
    
    const validationResult = schema.validate(req.body, {allowUnknown: false});
    return handleValidationError(validationResult, next)
  };
}

export default new AgentValidation();
