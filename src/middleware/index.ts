import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { UnprocessableEntityException } from '../exceptions';
import logger from '../logger';

export const validateObjectID = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  if (!isValidObjectId(id)) {
    logger.error('Invalid ObjectId: %s', id)
    throw new UnprocessableEntityException(`Invalid ObjectId: ${id}`);
  }

  next();
}
