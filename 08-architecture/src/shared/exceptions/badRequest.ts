import {BaseException} from './base';

export class BadRequestException extends BaseException {
  constructor(message = 'Bad request', details?: string, internalMsg?: string) {
    super(400, message, details, internalMsg);
  }
}
