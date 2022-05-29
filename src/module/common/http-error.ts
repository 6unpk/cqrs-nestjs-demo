export class HttpError extends Error {
  readonly statusCode: number;
  readonly errorMessage: string;

  constructor(statusCode: number, errorMessage: string) {
    super(errorMessage);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}
