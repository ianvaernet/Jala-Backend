export class BaseException extends Error {
  statusCode?: number;
  details?: string;
  internalMsg?: string;

  constructor(
    statusCode: number,
    message: string,
    details?: string,
    internalMsg?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.internalMsg = internalMsg;
  }
}
