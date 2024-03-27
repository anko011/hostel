export class NotExistUserException extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, NotExistUserException.prototype);
  }
}
