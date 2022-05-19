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

export const isValidPosition = (position: any) =>
  position.file &&
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].includes(position.file) &&
  position.rank &&
  [1, 2, 3, 4, 5, 6, 7, 8].includes(position.rank);
