import { BaseException } from './base';

export class ConflictException extends BaseException {
  constructor(message = 'Conflict', details?: string, internalMsg?: string) {
    super(409, message, details, internalMsg);
  }
}
