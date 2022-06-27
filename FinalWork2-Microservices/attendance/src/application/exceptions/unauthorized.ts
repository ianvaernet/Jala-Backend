import { BaseException } from './base';

export class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized', details?: string, internalMsg?: string) {
    super(401, message, details, internalMsg);
  }
}
