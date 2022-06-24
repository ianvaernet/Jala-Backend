import { BaseException } from './base';

export class ForbiddenException extends BaseException {
  constructor(message = 'Forbidden', details?: string, internalMsg?: string) {
    super(403, message, details, internalMsg);
  }
}
