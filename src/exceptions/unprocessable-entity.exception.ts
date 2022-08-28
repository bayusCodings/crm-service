import ApplicationError from './application.error';

class UnprocessanleEntityException extends ApplicationError {
  constructor(message: string, status: number = 422) {
    super(message, status);
  }
}

export default UnprocessanleEntityException;
