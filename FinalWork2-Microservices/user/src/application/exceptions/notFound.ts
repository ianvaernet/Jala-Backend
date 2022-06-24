import {BaseException} from './base';

export class NotFoundException extends BaseException {
  constructor(message = 'Not found', details?: string, internalMsg?: string) {
    super(404, message, details, internalMsg);
  }
}
