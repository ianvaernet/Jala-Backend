import { Request } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestException } from '../exceptions';

export const validateRequest = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestException(
      'Error in some input values',
      errors
        .array()
        .map((error) => `${error.param}: ${error.msg}`)
        .join(', ')
    );
  }
};
